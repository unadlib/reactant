/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import {
  applyPatches,
  injectable,
  optional,
  watch,
  getRef,
  ServiceIdentifier,
  PluginModule,
  Store,
  ReactantAction,
  actionIdentifier,
} from 'reactant';
import type { ILastActionData } from 'reactant-last-action';

import { CoworkerAdapter } from './coworkerAdapter';
import { PortDetector } from './portDetector';
import { Storage } from './storage';
import {
  proxyExecutorKey,
  proxyWorkerExecuteName,
  syncStateName,
  syncAllStateName,
  syncStateActionName,
  syncModuleStateActionName,
} from '../constants';
import type { ProxyExecParams, SymmetricTransport } from '../interfaces';

type State = Record<string, Record<string, unknown>>;

type ProxyExecutorInteraction = {
  [proxyWorkerExecuteName]: (execParams: ProxyExecParams) => Promise<unknown>;
  [syncStateName]: (action: ILastActionData, sequence: number) => Promise<void>;
  [syncAllStateName]: () => Promise<{
    state: State;
    sequence: number;
  }>;
};

export interface ICoworkerExecutorOptions {
  /**
   * Ignore action methods in all proxy modules on coworker.
   */
  ignoreSyncMethods?: string[];
  /**
   * Ignore sync state key in all proxy modules on coworker and main Process.
   */
  ignoreSyncStateKeys?: string[];
  /**
   * Enable patches checker for cross-module state update on coworker.
   */
  enablePatchesChecker?: boolean;
}

export const CoworkerExecutorOptions = Symbol('CoworkerExecutorOptions');

@injectable({
  name: 'CoworkerExecutor',
})
export class CoworkerExecutor extends PluginModule {
  protected proxyModules: ServiceIdentifier<unknown>[];

  protected proxyModuleKeys: string[] = [];

  protected ignoreSyncMethods =
    this.proxyExecutorOptions?.ignoreSyncMethods ?? [];

  protected ignoreSyncStateKeys =
    this.proxyExecutorOptions?.ignoreSyncStateKeys ?? [];

  constructor(
    protected portDetector: PortDetector,
    protected coworkerAdapter: CoworkerAdapter,
    @optional() protected storage?: Storage,
    @optional(CoworkerExecutorOptions)
    protected proxyExecutorOptions?: ICoworkerExecutorOptions
  ) {
    super();
    this.proxyModules =
      this.portDetector.sharedAppOptions.coworker?.modules ?? [];

    if (this.coworkerAdapter.isCoworker && this.enablePatchesChecker) {
      // stricter checks to prevent cross-module state updates.
      this.middleware = (store) => (next) => (_action: ReactantAction) => {
        const { _patches, type, method } = _action;
        let hasCoworkerState: boolean | undefined;
        _patches?.forEach(({ path, op, value }, index) => {
          const _hasCoworkerState = this.proxyModuleKeys.includes(`${path[0]}`);
          // ignore first patch
          if (!index) {
            hasCoworkerState = _hasCoworkerState;
          } else if (hasCoworkerState !== _hasCoworkerState) {
            const methodName = `${type as string}.${method}`;
            throw new Error(
              `Update state error: Mixed update of coworker proxy state and isolated state is not supported, please check method '${methodName}'.`
            );
          }
        });
        return next(_action);
      };
    }

    if (this.storage && this.coworkerAdapter.isMain) {
      // main process should ignore proxy module storage state
      this.storage.beforeCombinePersistReducer = () => {
        const proxyModules: any[] = [];
        this.proxyModules.forEach((serviceIdentifier) => {
          const modules = this.ref.container!.getAll<any>(serviceIdentifier);
          proxyModules.push(...modules);
        });
        this.storage!.storageSettingMap.forEach((_, module) => {
          if (proxyModules.includes(module)) {
            this.storage!.storageSettingMap.delete(module);
          }
        });
      };
    }
  }

  protected get enablePatchesChecker() {
    return this.proxyExecutorOptions?.enablePatchesChecker ?? __DEV__;
  }

  afterCreateStore = (store: Store) => {
    this.applyProxyExecute();
    this.applyProxyModules(this.proxyModules);
    this.applyProxyState();
    if (this.coworkerAdapter.isCoworker && this.storage) {
      // sync up last state when proxy module state is rehydrated
      this.proxyModules.forEach((serviceIdentifier) => {
        const modules = this.ref.container!.getAll<any>(serviceIdentifier);
        modules.forEach((module) => {
          if (this.storage!.storageSettingMap.has(module)) {
            const stopWatching = watch(
              module,
              () => this.storage!.getRehydrated(module),
              (rehydrated) => {
                if (rehydrated) {
                  stopWatching();
                  const { identifier, state } = getRef(module);
                  this.sequence += 1;
                  this.transport.emit(
                    syncStateName,
                    {
                      _reactant: actionIdentifier,
                      type: `${actionIdentifier}_${syncModuleStateActionName}`,
                      params: [],
                      _patches: [
                        {
                          op: 'replace',
                          path: [identifier!],
                          value: state,
                        },
                      ],
                    },
                    this.sequence
                  );
                }
              }
            );
          }
        });
      });
    }
    return store;
  };

  protected get ref() {
    return getRef(this);
  }

  protected sequence = 0;

  protected applyProxyState() {
    if (this.coworkerAdapter.isMain) {
      this.transport.listen(syncStateName, async (action, coworkerSequence) => {
        // If the sequence is not continuous, it means that the main process need sync all state from coworker process.
        if (this.sequence + 1 !== coworkerSequence) {
          this.transport.emit(syncAllStateName).then((options) => {
            this.sequence = options.sequence;
            const currentState = this.ref.store!.getState();
            const _sequence = this.portDetector.lastAction.sequence;
            const state = {
              ...currentState,
              ...options.state,
            };
            this.ignoreStates(state, currentState);
            this.ref.store!.dispatch({
              _reactant: actionIdentifier,
              type: `${actionIdentifier}_${syncStateActionName}`,
              state,
              _sequence,
            });
          });
          return;
        }
        this.sequence = coworkerSequence;
        const currentState = this.ref.store!.getState();
        const _sequence = this.portDetector.lastAction.sequence;
        const state = applyPatches(currentState, action._patches!);
        this.ignoreStates(state, currentState);
        this.ref.store!.dispatch({
          ...action,
          state,
          _sequence,
        });
      });
    }
    if (this.coworkerAdapter.isCoworker) {
      watch(
        this,
        () => this.portDetector.lastAction.action,
        (lastAction) => {
          if (
            this.proxyModuleKeys.includes(lastAction.type as string) &&
            !this.ignoreSyncMethods.includes(lastAction.method!)
          ) {
            const _patches = lastAction._patches?.filter(({ path }) => {
              const [module, key] = path;
              return (
                this.proxyModuleKeys.includes(module as string) &&
                !this.ignoreSyncStateKeys.includes(key as string)
              );
            });
            this.sequence += 1;
            this.transport.emit(
              syncStateName,
              { ...lastAction, _patches },
              this.sequence
            );
          }
        }
      );
      this.transport.listen(syncAllStateName, async () => {
        const currentState = this.ref.store!.getState();
        const state: Record<string, Record<string, unknown>> = {};
        this.proxyModuleKeys.forEach((key) => {
          state[key] = {
            ...currentState[key],
          };
          this.ignoreSyncStateKeys.forEach((ignoreKey) => {
            delete state[key][ignoreKey];
          });
        });
        return {
          state,
          sequence: this.sequence,
        };
      });
    }
  }

  ignoreStates(state: State, currentState: State) {
    this.ignoreSyncStateKeys.forEach((ignoreKey) => {
      this.proxyModuleKeys.forEach((key) => {
        state[key][ignoreKey] = currentState[key][ignoreKey];
      });
    });
  }

  protected applyProxyExecute() {
    if (this.coworkerAdapter.isCoworker) {
      this.transport.listen(
        proxyWorkerExecuteName,
        async ({ module, method, args }) => {
          const instance = this.ref.modules![module];
          if (__DEV__ && typeof instance[method] !== 'function') {
            console.warn(
              `The method "${method}" does not exist in the module "${module}".`
            );
          }
          return instance[method]?.(...args);
        }
      );
    }
  }

  protected applyProxyModules(proxyModules: ServiceIdentifier<unknown>[]) {
    if (this.coworkerAdapter.isMain) {
      proxyModules.forEach((serviceIdentifier) => {
        const modules = this.ref.container!.getAll<any>(serviceIdentifier);
        modules.forEach((module) => {
          if (__DEV__ && module[proxyExecutorKey]) {
            console.warn(
              `The proxy module "${serviceIdentifier.toString()}" already exists.`
            );
          }
          this.proxyModuleKeys.push(getRef(module)!.identifier!);
          module[proxyExecutorKey] = (execParams: ProxyExecParams) => {
            return this.transport.emit(proxyWorkerExecuteName, execParams);
          };
        });
      });
    } else {
      proxyModules.forEach((serviceIdentifier) => {
        const modules = this.ref.container!.getAll<any>(serviceIdentifier);
        modules.forEach((module) => {
          this.proxyModuleKeys.push(getRef(module)!.identifier!);
        });
      });
    }
  }

  /**
   * Add proxy modules.
   */
  addModules(proxyModules: ServiceIdentifier<unknown>[]) {
    if (__DEV__) {
      if (!Array.isArray(proxyModules)) {
        throw new TypeError(
          `Expected an array, but received: ${typeof proxyModules}`
        );
      }
    }
    this.proxyModules.push(...proxyModules);
    this.applyProxyModules(proxyModules);
  }

  protected get transport() {
    return this.coworkerAdapter
      .transport as SymmetricTransport<ProxyExecutorInteraction>;
  }
}
