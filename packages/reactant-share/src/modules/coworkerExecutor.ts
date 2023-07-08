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
} from 'reactant';
import type { ILastActionState } from 'reactant-last-action';

import { CoworkerAdapter } from './coworkerAdapter';
import { PortDetector } from './portDetector';
import {
  proxyExecutorKey,
  proxyWorkerExecuteName,
  syncStateName,
  syncAllStateName,
} from '../constants';
import type { ProxyExecParams, SymmetricTransport } from '../interfaces';

type ProxyExecutorInteraction = {
  [proxyWorkerExecuteName]: (execParams: ProxyExecParams) => Promise<unknown>;
  [syncStateName]: (
    action: ILastActionState<any>,
    sequence: number
  ) => Promise<void>;
  [syncAllStateName]: () => Promise<{
    state: Record<string, unknown>;
    sequence: number;
  }>;
};

export interface ICoworkerExecutorOptions {
  proxyModules?: ServiceIdentifier<unknown>[];
  ignoreSyncMethods?: string[];
}

export const CoworkerExecutorOptions = Symbol('CoworkerExecutorOptions');

@injectable({
  name: 'CoworkerExecutor',
})
export class CoworkerExecutor extends PluginModule {
  protected proxyModules: ServiceIdentifier<unknown>[];

  protected proxyModuleKeys: string[] = [];

  constructor(
    protected portDetector: PortDetector,
    protected coworkerAdapter: CoworkerAdapter,
    @optional(CoworkerExecutorOptions)
    protected proxyExecutorOptions?: ICoworkerExecutorOptions
  ) {
    super();
    this.proxyModules =
      this.portDetector.sharedAppOptions.coworker?.modules ?? [];
  }

  override afterCreateStore(store: Store) {
    this.applyProxyExecute();
    this.applyProxyModules(this.proxyModules);
    this.applyProxyState();
    return store;
  }

  protected get ignoreSyncMethods() {
    return this.proxyExecutorOptions?.ignoreSyncMethods ?? [];
  }

  protected get ref() {
    return getRef(this);
  }

  protected applyProxyState() {
    if (this.coworkerAdapter.isMain) {
      let sequence = 0;
      this.transport.listen(syncStateName, async (action, coworkerSequence) => {
        // If the sequence is not continuous, it means that the main process need sync all state from coworker process.
        if (sequence + 1 !== coworkerSequence) {
          this.transport.emit(syncAllStateName).then((options) => {
            sequence = options.sequence;
            const currentState = this.ref.store!.getState();
            const _sequence =
              this.portDetector.lastAction.action._sequence! + 1;
            this.ref.store!.dispatch({
              ...action,
              state: {
                ...currentState,
                ...options.state,
              },
              _sequence,
            });
          });
          return;
        }
        sequence = coworkerSequence;
        const currentState = this.ref.store!.getState();
        const _sequence = this.portDetector.lastAction.action._sequence! + 1;
        const state = applyPatches(currentState, action._patches!);
        this.ref.store!.dispatch({
          ...action,
          state,
          _sequence,
        });
      });
    }
    if (this.coworkerAdapter.isCoworker) {
      let sequence = 0;
      watch(
        this,
        () => this.portDetector.lastAction.action,
        (lastAction) => {
          // TODO: Implement stricter checks to prevent cross-module state updates.
          if (
            this.proxyModuleKeys.includes(lastAction.type as string) &&
            !this.ignoreSyncMethods.includes(lastAction.method!)
          ) {
            sequence += 1;
            this.transport.emit(syncStateName, lastAction, sequence);
          }
        }
      );
      this.transport.listen(syncAllStateName, async () => {
        const currentState = this.ref.store!.getState();
        const state: Record<string, unknown> = {};
        this.proxyModuleKeys.forEach((key) => {
          state[key] = currentState[key];
        });
        return {
          state,
          sequence,
        };
      });
    }
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
