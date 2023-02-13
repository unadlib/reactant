import {
  injectable,
  inject,
  actionIdentifier,
  storeKey,
  Service,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import {
  loadFullStateActionName,
  SharedAppOptions,
  syncToClientsName,
} from './constants';
import {
  CallbackWithHook,
  ClientTransport,
  Port,
  PortApp,
  Transports,
  Transport,
  ISharedAppOptions,
} from './interfaces';
import { createId } from './utils';

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

  syncFullStatePromise?: ReturnType<
    ClientTransport[typeof loadFullStateActionName]
  >;

  /**
   * previous port
   */
  previousPort?: Port;

  /**
   * client id
   */
  clientId: string | null = null;

  /**
   * allow Disable Sync
   */
  allowDisableSync = () => true;

  constructor(
    @inject(SharedAppOptions) public sharedAppOptions: ISharedAppOptions,
    public lastAction: LastAction
  ) {
    this.onClient((transport) => {
      this.clientId = createId();
      this.syncFullState({ forceSync: false });
      const disposeSyncToClients = transport.listen(
        syncToClientsName,
        async (fullState) => {
          if (!fullState) return;
          const store = (this as Service)[storeKey];
          store!.dispatch({
            type: `${actionIdentifier}_${loadFullStateActionName}`,
            state: {
              ...fullState,
              // ignore router state sync for last action
              router: store!.getState().router,
            },
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
      this.clientId = null;
      return () => {
        this.previousPort = 'server';
      };
    });
  }

  get id() {
    return this.clientId ?? '__SERVER__';
  }

  get shared() {
    return !!(this.sharedAppOptions.port && this.sharedAppOptions.type);
  }

  get name() {
    return this.sharedAppOptions.portName ?? 'default';
  }

  get disableSyncClient() {
    return (
      document.visibilityState === 'hidden' &&
      !this.sharedAppOptions.forcedSyncClient &&
      this.allowDisableSync()
    );
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

  get isWorkerMode() {
    return this.sharedAppOptions.type === 'SharedWorker';
  }

  get isServerWorker() {
    return this.isWorkerMode && this.isServer;
  }

  get isServer() {
    return !!this.detectPort('server');
  }

  get isClient() {
    return !!this.detectPort('client');
  }

  get transports() {
    return this.sharedAppOptions.transports ?? {};
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
    if (this.syncFullStatePromise) {
      await this.syncFullStatePromise;
      return;
    }
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
      // ignore router state sync for last action
      state: { ...fullState, router: store!.getState().router },
      _reactant: actionIdentifier,
    });
    this.lastAction.sequence = fullState[this.lastAction.stateKey]._sequence;
  }

  /**
   * transform port with new transport
   */
  transform(port: Port, transport?: Transport) {
    if (port !== 'server' && port !== 'client') {
      throw new Error(`The port '${port}' is not supported.`);
    }
    this.sharedAppOptions.transports![port] =
      transport ?? this.sharedAppOptions.transports![port];
    this.sharedAppOptions.transform!(port);
  }
}
