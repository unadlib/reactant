import {
  injectable,
  inject,
  actionIdentifier,
  storeKey,
  Service,
  optional,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import { Storage } from './storage';
import { loadFullStateActionName, syncToClientsName } from './constants';
import {
  CallbackWithHook,
  ClientTransport,
  Port,
  PortApp,
  Transports,
  Transport,
} from './interfaces';

export * from 'reactant-last-action';

export const PortDetectorOptions = Symbol('PortDetectorOptions');

export interface IPortDetectorOptions {
  transports?: Transports;
}

/**
 * Port Detector
 *
 * It provides port detection and client/server port switching functions.
 */
@injectable()
export class PortDetector {
  protected portApp?: PortApp;

  protected lastHooks?: Set<ReturnType<CallbackWithHook>>;

  protected serverCallbacks = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >();

  protected clientCallbacks = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >();

  protected syncFullStatePromise?: ReturnType<
    ClientTransport[typeof loadFullStateActionName]
  >;

  previousPort?: Port;

  constructor(
    @inject(PortDetectorOptions) protected options: IPortDetectorOptions,
    protected lastAction: LastAction,
    @optional(Storage) protected storage?: Storage
  ) {
    if (this.storage) {
      this.onServer(() => {
        this.storage!.persistor!.persist();
      });

      this.onClient(() => {
        this.storage!.persistor!.pause();
      });
    }

    this.onClient((transport) => {
      this.syncFullState({ forceSync: false });
      const disposeSyncToClients = transport.listen(
        syncToClientsName,
        async (fullState) => {
          if (!fullState) return;
          const store = (this as Service)[storeKey];
          store!.dispatch({
            type: `${actionIdentifier}_${loadFullStateActionName}`,
            state: fullState,
            _reactant: actionIdentifier,
          });
          this.lastAction.sequence =
            fullState[this.lastAction.stateKey]._sequence;
        }
      );
      return () => {
        disposeSyncToClients?.();
        this.previousPort = 'client';
      };
    });

    this.onServer(() => {
      //
      return () => {
        this.previousPort = 'server';
      };
    });
  }

  onRehydrate(callback: () => void) {
    if (!this.storage || this.storage.rehydrated) {
      callback();
    } else {
      this.storage.rehydrateCallbackSet.add(callback);
    }
  }

  protected detectPort(port: Port) {
    return this.portApp?.[port];
  }

  /**
   * onServer
   *
   * When the port is server, this hook will execute.
   * And allow to return a function that will be executed when the current port is switched to client.
   */
  onServer = (callback: CallbackWithHook<Required<Transports>['server']>) => {
    if (typeof callback !== 'function') {
      throw new Error(`'onServer' argument should be a function.`);
    }
    this.serverCallbacks.add(callback);

    if (
      this.lastHooks &&
      this.lastHooks.size > 0 &&
      this.isServer &&
      this.transport
    ) {
      try {
        const hook = callback(this.transport);
        this.lastHooks.add(hook);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      this.serverCallbacks.delete(callback);
    };
  };

  /**
   * onClient
   *
   * When the port is client, this hook will execute.
   * And allow to return a function that will be executed when the current port is switched to server.
   */
  onClient = (callback: CallbackWithHook<Required<Transports>['client']>) => {
    if (typeof callback !== 'function') {
      throw new Error(`'onClient' argument should be a function.`);
    }
    this.clientCallbacks.add(callback);

    if (
      this.lastHooks &&
      this.lastHooks.size > 0 &&
      this.isClient &&
      this.transport
    ) {
      try {
        const hook = callback(this.transport);
        this.lastHooks.add(hook);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      this.clientCallbacks.delete(callback);
    };
  };

  get isServer() {
    return !!this.detectPort('server');
  }

  get isClient() {
    return !!this.detectPort('client');
  }

  get transports() {
    return this.options.transports ?? {};
  }

  transport?: Transport;

  setPort(
    currentPortApp: PortApp,
    transport: Required<Transports>[keyof Transports]
  ) {
    this.transport = transport;
    if (this.lastHooks) {
      for (const hook of this.lastHooks) {
        try {
          hook?.();
        } catch (e) {
          console.error(e);
        }
      }
    }
    this.lastHooks = new Set();
    this.portApp = currentPortApp;
    const callbacks = this.isClient
      ? this.clientCallbacks
      : this.serverCallbacks;
    for (const callback of callbacks) {
      try {
        const hook = callback(transport);
        this.lastHooks.add(hook);
      } catch (e) {
        console.error(e);
      }
    }
  }

  syncToClients() {
    const store = (this as Service)[storeKey];
    if (this.transports.server) {
      this.transports.server?.emit(
        { name: syncToClientsName, respond: false },
        store!.getState()
      );
    } else {
      throw new Error(
        `Failed to 'syncToClients()', 'transports.server' does not exist.`
      );
    }
  }

  async syncFullState({ forceSync = true } = {}) {
    if (forceSync) {
      this.syncFullStatePromise = undefined;
    }
    if (this.syncFullStatePromise) return;
    if (typeof this.transports.client === 'undefined') {
      throw new Error(`The current client transport does not exist.`);
    }
    this.syncFullStatePromise = this.transports.client.emit(
      loadFullStateActionName,
      !forceSync ? this.lastAction.sequence : -1
    );
    const fullState = await this.syncFullStatePromise;
    this.syncFullStatePromise = undefined;
    if (typeof fullState === 'undefined') {
      throw new Error(`Failed to sync full state from server port.`);
    }
    if (
      fullState === null ||
      (!forceSync &&
        this.lastAction.sequence >
          fullState[this.lastAction.stateKey]._sequence)
    )
      return;
    const store = (this as Service)[storeKey];
    store!.dispatch({
      type: `${actionIdentifier}_${loadFullStateActionName}`,
      state: fullState,
      _reactant: actionIdentifier,
    });
    this.lastAction.sequence = fullState[this.lastAction.stateKey]._sequence;
  }
}
