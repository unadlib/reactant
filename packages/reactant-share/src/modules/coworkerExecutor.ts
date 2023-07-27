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
  ReactantModuleOptions,
  subscribe,
} from 'reactant';
import type { ILastActionData } from 'reactant-last-action';

import { CoworkerAdapter } from './coworkerAdapter';
import { PortDetector } from './portDetector';
import { Storage } from './storage';
import {
  proxyExecutorKey,
  proxyWorkerExecuteName,
  syncStateName,
  requestSyncAllStateName,
  syncStateActionName,
  syncModuleStateActionName,
  storageModuleName,
  pushAllStateName,
} from '../constants';
import type { ProxyExecParams, SymmetricTransport } from '../interfaces';

type State = Record<string, Record<string, unknown>>;

type ProxyExecutorInteraction = {
  [proxyWorkerExecuteName]: (execParams: ProxyExecParams) => Promise<unknown>;
  [syncStateName]: (action: ILastActionData, sequence: number) => Promise<void>;
  [requestSyncAllStateName]: () => Promise<void>;
  [pushAllStateName]: (options: {
    state: State;
    sequence: number;
  }) => Promise<void>;
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
      this.portDetector.sharedAppOptions.coworker?.modules.map((item) =>
        this.getServiceIdentifier(item)
      ) ?? [];

    if (this.coworkerAdapter.isCoworker && this.enablePatchesChecker) {
      // stricter checks to prevent cross-module state updates.
      this.middleware = (store) => (next) => (_action: ReactantAction) => {
        const { _patches, type, method } = _action;
        // skip check for storage module change any state
        if (type === storageModuleName) return next(_action);
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

  // TODO: fix dynamic module with storage state
  /**
   * Add proxy modules.
   */
  addProxyModules(modules: ReactantModuleOptions[]) {
    if (__DEV__) {
      if (!Array.isArray(modules)) {
        throw new TypeError(
          `Expected an array, but received: ${typeof modules}`
        );
      }
    }
    const proxyModules = modules.map((item) => this.getServiceIdentifier(item));
    this.proxyModules.push(...proxyModules);
  }

  /**
   * Add ignore sync methods
   */
  addIgnoreSyncMethods(keys: string[]) {
    this.ignoreSyncMethods.push(...keys);
  }

  /**
   * Add ignore sync state keys
   */
  addIgnoreSyncStateKeys(keys: string[]) {
    this.ignoreSyncStateKeys.push(...keys);
  }

  protected getServiceIdentifier(item: any): ServiceIdentifier<unknown> {
    return item?.provide ?? item;
  }

  protected get enablePatchesChecker() {
    return this.proxyExecutorOptions?.enablePatchesChecker ?? __DEV__;
  }

  afterCreateStore = (store: Store) => {
    this.applyProxyExecute();
    this.applyProxyModules(this.proxyModules);
    this.applyProxyState();
    if (this.coworkerAdapter.isCoworker) {
      if (this.sequence === -1) {
        this.sequence = 0;
        this.pushAllState();
      }
      if (this.storage) {
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
    }
    if (this.coworkerAdapter.isMain) {
      if (this.sequence === -1) {
        this.requestSyncAllState();
      }
    }
    return store;
  };

  protected get ref() {
    return getRef(this);
  }

  protected sequence = -1;

  protected applyProxyState() {
    if (this.coworkerAdapter.isMain) {
      this.transport.listen(pushAllStateName, async (options) => {
        this.handleSyncAllState(options);
      });
      this.transport.listen(syncStateName, async (action, coworkerSequence) => {
        // If the sequence is not continuous, it means that the main process need sync all state from coworker process.
        if (this.sequence + 1 !== coworkerSequence) {
          this.requestSyncAllState();
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
      this.transport.listen(requestSyncAllStateName, async () => {
        this.pushAllState();
      });
    }
  }

  protected pushAllState() {
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

    this.transport.emit(pushAllStateName, {
      state,
      sequence: this.sequence,
    });
  }

  protected handleSyncAllState(options: { state: State; sequence: number }) {
    if (options.sequence === this.sequence && this.sequence === -1) {
      return;
    }
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
  }

  protected requestSyncAllState() {
    this.transport.emit(requestSyncAllStateName);
  }

  protected ignoreStates(state: State, currentState: State) {
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

  protected get transport() {
    return this.coworkerAdapter
      .transport as SymmetricTransport<ProxyExecutorInteraction>;
  }
}
