/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import {
  injectable,
  applyPatches,
  watch,
  getRef,
  ServiceIdentifier,
  PluginModule,
  Store,
  ReactantAction,
  actionIdentifier,
  inject,
  optional,
  nameKey,
  Service,
} from 'reactant';
import { createTransport, Transport } from 'data-transport';
import type { ILastActionData } from 'reactant-last-action';

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
  coworkerKey,
} from '../constants';
import type { ProxyExecParams, SymmetricTransport } from '../interfaces';

type State = Record<string, Record<string, unknown>>;

interface Module<T> extends Function {
  new (...args: any[]): T;
}

type ProxyExecutorInteraction = {
  [proxyWorkerExecuteName]: (execParams: ProxyExecParams) => Promise<unknown>;
  [syncStateName]: (action: ILastActionData, sequence: number) => Promise<void>;
  [requestSyncAllStateName]: () => Promise<void>;
  [pushAllStateName]: (options: {
    state: State;
    sequence: number;
  }) => Promise<void>;
};

export interface ICoworkerOptions {
  /**
   * Importing the injected dependency modules.
   */
  useModules: ServiceIdentifier<unknown>[];
  /**
   *  Whether the current thread is the coworker thread.
   */
  isCoworker: boolean;
  /**
   * Specify a SharedWorker for coworker.
   */
  worker?: SharedWorker | Worker;
  /**
   * Enable transport debugger for coworker.
   */
  enableTransportDebugger?: boolean;
  /**
   * coworker transports
   */
  transports?: {
    main?: Transport;
    coworker?: Transport;
  };
  /**
   * Ignore sync state key in all proxy modules on coworker and main thread.
   */
  ignoreSyncStateKeys?: string[];
  /**
   * Enable patches checker for cross-module state update on coworker.
   */
  enablePatchesChecker?: boolean;
}

export const CoworkerOptions = Symbol('CoworkerOptions');

@injectable({
  name: 'Coworker',
})
export class Coworker extends PluginModule {
  protected proxyModules: ServiceIdentifier<unknown>[];

  protected proxyModuleKeys: string[] = [];

  protected ignoreSyncStateKeys =
    this.coworkerOptions?.ignoreSyncStateKeys ?? [];

  transport?: SymmetricTransport<ProxyExecutorInteraction>;

  constructor(
    protected portDetector: PortDetector,
    @inject(CoworkerOptions) protected coworkerOptions: ICoworkerOptions,
    @optional() protected storage?: Storage
  ) {
    super();
    if (!this.portDetector.isClient) {
      this.transport = this.createTransport();
    }

    this.proxyModules = [...this.coworkerOptions.useModules];

    if (this.isCoworker && this.enablePatchesChecker) {
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

    if (this.storage && this.isMain) {
      // main thread should ignore proxy module storage state
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

  protected createTransport():
    | SymmetricTransport<ProxyExecutorInteraction>
    | undefined {
    if (this.portDetector.isWorkerMode) {
      if (this.isCoworker) {
        return (
          this.coworkerOptions!.transports?.coworker ??
          createTransport('Broadcast', {
            prefix: this.prefix,
            verbose: this.coworkerOptions?.enableTransportDebugger,
          })
        );
      }
      if (this.portDetector.sharedAppOptions.port === 'server') {
        return (
          this.coworkerOptions!.transports?.main ??
          createTransport('Broadcast', {
            prefix: this.prefix,
            verbose: this.coworkerOptions?.enableTransportDebugger,
          })
        );
      }
    } else if (this.isCoworker) {
      const isWebWorker =
        !(globalThis as any).SharedWorkerGlobalScope &&
        (globalThis as any).WorkerGlobalScope;
      return (
        this.coworkerOptions!.transports?.coworker ??
        createTransport(
          isWebWorker ? 'WebWorkerInternal' : 'SharedWorkerInternal',
          {
            prefix: this.prefix,
            verbose: this.coworkerOptions?.enableTransportDebugger,
          }
        )
      );
    } else if (this.portDetector.sharedAppOptions.port !== 'client') {
      if (this.coworkerOptions!.transports?.main) {
        return this.coworkerOptions!.transports.main;
      }
      if (!this.coworkerOptions?.worker) {
        if (__DEV__) console.warn('No coworker support in server port.');
        return;
      }
      if (this.coworkerOptions.worker instanceof Worker) {
        return createTransport('WebWorkerClient', {
          worker: this.coworkerOptions.worker,
          prefix: this.prefix,
          verbose: this.coworkerOptions.enableTransportDebugger,
        });
      }
      return createTransport('SharedWorkerClient', {
        worker: this.coworkerOptions.worker,
        prefix: this.prefix,
        verbose: this.coworkerOptions.enableTransportDebugger,
      });
    }
  }

  protected get prefix() {
    return `reactant-share:${this.portDetector.sharedAppOptions.name}:coworker:${this.name}`;
  }

  get name() {
    return (this as Service)[nameKey]!;
  }

  /**
   * Whether the current thread is the coworker thread.
   */
  get isCoworker() {
    return this.coworkerOptions.isCoworker;
  }

  /**
   * Whether the current thread is the main thread.
   */
  get isMain() {
    return !this.isCoworker && !!this.transport;
  }

  // TODO: fix dynamic module with storage state
  /**
   * Add proxy modules.
   */
  addProxyModules(modules: ServiceIdentifier<unknown>[]) {
    if (__DEV__) {
      if (!Array.isArray(modules)) {
        throw new TypeError(
          `Expected an array, but received: ${typeof modules}`
        );
      }
    }
    this.proxyModules.push(...modules);
  }

  /**
   * Add ignore sync state keys
   */
  addIgnoreSyncStateKeys(keys: string[]) {
    this.ignoreSyncStateKeys.push(...keys);
  }

  protected get enablePatchesChecker() {
    return this.coworkerOptions?.enablePatchesChecker ?? __DEV__;
  }

  afterCreateStore = (store: Store) => {
    this.applyProxyExecute();
    this.applyProxyModules(this.proxyModules);
    this.applyProxyState();
    if (this.isCoworker) {
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
                    // If the coworker runs before the main thread,
                    // then the sequence will ensure that the state is properly synchronized.
                    this.transport!.emit(
                      { name: syncStateName, respond: false },
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
    if (this.isMain && this.sequence === -1) {
      this.requestSyncAllState();
    }
    return store;
  };

  protected get ref() {
    return getRef(this);
  }

  protected sequence = -1;

  protected applyProxyState() {
    if (this.isMain) {
      this.transport!.listen(pushAllStateName, async (options) => {
        this.handleSyncAllState(options);
      });
      this.transport!.listen(
        syncStateName,
        async (action, coworkerSequence) => {
          // If the sequence is not continuous, it means that the main thread need sync all state from coworker thread.
          if (this.sequence + 1 !== coworkerSequence) {
            this.requestSyncAllState();
            return;
          }
          const currentState = this.ref.store!.getState();
          const _sequence = this.portDetector.lastAction.sequence;
          const state = applyPatches(currentState, action._patches!);
          this.ignoreStates(state, currentState);
          this.ref.store!.dispatch({
            ...action,
            state,
            _sequence,
          });
          this.sequence = coworkerSequence;
        }
      );
    }
    if (this.isCoworker) {
      watch(
        this,
        () => this.portDetector.lastAction.action,
        (lastAction) => {
          const _patches = lastAction._patches?.filter(({ path }) => {
            const [module, key] = path;
            return (
              this.proxyModuleKeys.includes(module as string) &&
              !this.ignoreSyncStateKeys.includes(key as string)
            );
          });
          if (!_patches || _patches.length === 0) return;
          this.sequence += 1;
          // If the coworker runs before the main thread,
          // then the sequence will ensure that the state is properly synchronized.
          this.transport!.emit(
            { name: syncStateName, respond: false },
            { ...lastAction, _patches },
            this.sequence
          );
        }
      );
      this.transport!.listen(requestSyncAllStateName, async () => {
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

    this.transport!.emit(
      { name: pushAllStateName, respond: false },
      {
        state,
        sequence: this.sequence,
      }
    );
  }

  protected handleSyncAllState(options: { state: State; sequence: number }) {
    if (options.sequence === this.sequence && this.sequence !== -1) {
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
    this.transport!.emit({ name: requestSyncAllStateName, respond: false });
  }

  protected ignoreStates(state: State, currentState: State) {
    this.ignoreSyncStateKeys.forEach((ignoreKey) => {
      this.proxyModuleKeys.forEach((key) => {
        state[key][ignoreKey] = currentState[key][ignoreKey];
      });
    });
  }

  protected applyProxyExecute() {
    if (this.isCoworker) {
      this.transport!.listen(
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
    proxyModules.forEach((serviceIdentifier) => {
      const modules = this.ref.container!.getAll<any>(serviceIdentifier);
      modules.forEach((module) => {
        if (this.portDetector.isolatedModules.includes(module)) {
          throw new Error(`
            The module "${serviceIdentifier.toString()}" is isolated, and cannot be used as a proxy module in '${
            this.name
          }' coworker.
          `);
        }
        if (__DEV__ && module[coworkerKey]) {
          console.warn(
            `The proxy module "${serviceIdentifier.toString()}" with "${
              this.name
            }" coworker already exists.`
          );
        }
        module[coworkerKey] = this;
        this.proxyModuleKeys.push(getRef(module)!.identifier!);
        if (this.isMain) {
          if (__DEV__ && module[proxyExecutorKey]) {
            console.warn(
              `The proxy module "${serviceIdentifier.toString()}" with "${
                this.name
              }" already exists.`
            );
          }
          module[proxyExecutorKey] = (execParams: ProxyExecParams) => {
            return this.transport!.emit(proxyWorkerExecuteName, execParams);
          };
        }
      });
    });
  }
}

const ICoworker = Coworker;

export const createCoworker = (name: string): [Module<Coworker>, symbol] => {
  const CoworkerOptions = Symbol(`${name}CoworkerOptions`);

  @injectable({
    name: `${name}Coworker`,
  })
  class Coworker extends ICoworker {
    constructor(
      protected portDetector: PortDetector,
      @inject(CoworkerOptions) protected coworkerOptions: ICoworkerOptions,
      @optional() protected storage?: Storage
    ) {
      super(portDetector, coworkerOptions, storage);
    }
  }
  return [Coworker, CoworkerOptions] as any;
};

export const getCoworker = (instance: object): Coworker | undefined => {
  return (instance as any)?.[coworkerKey];
};
