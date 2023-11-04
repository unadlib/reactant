import {
  injectable,
  inject,
  actionIdentifier,
  storeKey,
  Service,
  identifierKey,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import {
  loadFullStateActionName,
  SharedAppOptions,
  syncToClientsName,
  syncClientIdsFromClientsName,
  syncClientIdToServerName,
  removeClientIdToServerName,
} from '../constants';
import type {
  CallbackWithHook,
  ClientEvents,
  Port,
  PortApp,
  Transports,
  Transport,
  ISharedAppOptions,
} from '../interfaces';
import { createId } from '../utils';

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
    ClientEvents[typeof loadFullStateActionName]
  >;

  /**
   * previous port
   */
  previousPort?: Port;

  /**
   * client id, it will be generated when the port is client, it is null in server port.
   */
  clientId: string | null = null;

  /**
   * allow Disable Sync
   */
  allowDisableSync = () => true;

  /**
   * client ids, it will collect all the client ids when the port is server, it is an empty array in client port.
   */
  clientIds: string[] = [];

  constructor(
    @inject(SharedAppOptions) public sharedAppOptions: ISharedAppOptions,
    public lastAction: LastAction
  ) {
    this.onClient((transport) => {
      this.clientId = createId();
      this.clientIds = [];
      this.syncFullState({ forceSync: false });
      const disposeSyncToClients = transport.listen(
        syncToClientsName,
        async (fullState) => {
          if (!fullState) return;
          const store = (this as Service)[storeKey];
          store!.dispatch({
            type: `${actionIdentifier}_${loadFullStateActionName}`,
            state: this.getNextState(fullState),
            _reactant: actionIdentifier,
          });
          this.lastAction.sequence =
            fullState[this.lastAction.stateKey]._sequence;
        }
      );
      transport.emit(
        { name: syncClientIdToServerName, respond: false },
        this.clientId
      );
      const disposeSyncClientIds = transport.listen(
        syncClientIdsFromClientsName,
        async () => {
          if (this.clientId) {
            // for all clients send current client id to server
            transport.emit(
              { name: syncClientIdToServerName, respond: false },
              this.clientId
            );
          }
        }
      );
      const removeClientIdToServer = () => {
        transport.emit(
          { name: removeClientIdToServerName, respond: false },
          this.clientId!
        );
      };
      // the unload event is just only triggered in shared worker mode
      window.addEventListener('unload', removeClientIdToServer);
      return () => {
        this.previousPort = 'client';
        disposeSyncToClients?.();
        disposeSyncClientIds?.();
        window.removeEventListener('unload', removeClientIdToServer);
      };
    });

    this.onServer((transport) => {
      this.clientId = null;
      transport.emit({ name: syncClientIdsFromClientsName, respond: false });
      const disposeSyncClientId = transport.listen(
        syncClientIdToServerName,
        (clientId) => {
          if (!this.clientIds.includes(clientId)) {
            this.clientIds.push(clientId);
          }
        }
      );
      return () => {
        this.previousPort = 'server';
        disposeSyncClientId?.();
      };
    });
  }

  isolatedModules: Service[] = [];

  /**
   * all isolated instances state will not be sync to other clients or server.
   */
  disableShare(instance: object) {
    if (__DEV__) {
      if (!this.shared) {
        console.warn(`The app is not shared, so it cannot be isolated.`);
      }
      if (this.isolatedModules.includes(instance)) {
        console.warn(
          `This module "${instance.constructor.name}" has been disabled for state sharing.`
        );
      }
    }
    this.isolatedModules = this.isolatedModules.concat(instance);
  }

  protected lastIsolatedInstances?: Service[];

  protected lastIsolatedInstanceKeys?: (string | undefined)[];

  get isolatedInstanceKeys() {
    if (this.lastIsolatedInstances !== this.isolatedModules) {
      this.lastIsolatedInstanceKeys = this.isolatedModules.map(
        (instance) => instance[identifierKey]
      );
    }
    return this.lastIsolatedInstanceKeys ?? [];
  }

  hasIsolatedState(key: string) {
    return this.isolatedInstanceKeys.includes(key);
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
      state: this.getNextState(fullState),
      _reactant: actionIdentifier,
    });
    this.lastAction.sequence = fullState[this.lastAction.stateKey]._sequence;
  }

  /**
   * ignore router state and isolated state sync for last action
   */
  protected getNextState(fullState: Record<string, any>) {
    const store = (this as Service)[storeKey];
    const currentFullState = store!.getState();
    const nextState: Record<string, any> = {
      ...fullState,
      router: currentFullState.router,
    };
    if (this.isolatedInstanceKeys.length) {
      this.isolatedInstanceKeys.forEach((key) => {
        if (key) {
          nextState[key] = currentFullState[key];
        }
      });
    }
    return nextState;
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
