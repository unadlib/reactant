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
} from './interfaces';

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
  private portApp?: PortApp;

  private lastHooks?: Set<ReturnType<CallbackWithHook>>;

  private serverCallbacks = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >();

  private clientCallbacks = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >();

  private syncFullStatePromise?: ReturnType<
    ClientTransport[typeof loadFullStateActionName]
  >;

  previousPort?: Port;

  constructor(
    @inject(PortDetectorOptions) private options: IPortDetectorOptions,
    private lastAction: LastAction,
    @optional(Storage) private storage?: Storage
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
      this.syncFullState();
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

  private detectPort(port: Port) {
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

  setPort(
    currentPortApp: PortApp,
    transport: Required<Transports>[keyof Transports]
  ) {
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

  async syncFullState() {
    if (this.syncFullStatePromise) return;
    if (typeof this.transports.client === 'undefined') {
      throw new Error(`The current client transport does not exist.`);
    }
    this.syncFullStatePromise = this.transports.client.emit(
      loadFullStateActionName,
      this.lastAction.sequence
    );
    const fullState = await this.syncFullStatePromise;
    this.syncFullStatePromise = undefined;
    if (typeof fullState === 'undefined') {
      throw new Error(`Failed to sync full state from server port.`);
    }
    if (
      fullState === null ||
      this.lastAction.sequence > fullState[this.lastAction.stateKey]._sequence
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
