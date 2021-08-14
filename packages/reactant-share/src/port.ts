import {
  injectable,
  inject,
  actionIdentifier,
  storeKey,
  Service,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import { loadFullStateActionName } from './constants';
import { CallbackWithHook, Port, PortApp, Transports } from './interfaces';

export const PortDetectorOptions = Symbol('PortDetectorOptions');

export interface IPortDetectorOptions {
  transports?: Transports;
}

@injectable()
export class PortDetector {
  private portApp?: PortApp;

  private lastHooks?: Set<ReturnType<CallbackWithHook>>;

  private serverCallbacks = new Set<CallbackWithHook>();

  private clientCallbacks = new Set<CallbackWithHook>();

  private syncFullStatePromise?: Promise<Record<string, any>>;

  constructor(
    @inject(PortDetectorOptions) private options: IPortDetectorOptions,
    private lastAction: LastAction
  ) {}

  private detectPort(port: Port) {
    return this.portApp?.[port];
  }

  onServer(callback: CallbackWithHook) {
    if (typeof callback !== 'function') {
      throw new Error(`'onServer' argument should be a function.`);
    }
    this.serverCallbacks.add(callback);
    return () => {
      this.serverCallbacks.delete(callback);
    };
  }

  onClient(callback: CallbackWithHook) {
    if (typeof callback !== 'function') {
      throw new Error(`'onClient' argument should be a function.`);
    }
    this.clientCallbacks.add(callback);
    return () => {
      this.clientCallbacks.delete(callback);
    };
  }

  get isServer() {
    return !!this.detectPort('server');
  }

  get isClient() {
    return !!this.detectPort('client');
  }

  get transports() {
    return this.options.transports ?? {};
  }

  setPort(currentPortApp: PortApp, transport: Transports[keyof Transports]) {
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

  async syncFullState() {
    if (this.syncFullStatePromise) return;
    if (typeof this.transports.client === 'undefined') {
      throw new Error(``);
    }
    this.syncFullStatePromise = this.transports.client.emit(
      loadFullStateActionName
    );
    const fullState = await this.syncFullStatePromise;
    this.syncFullStatePromise = undefined;
    const store = (this as Service)[storeKey];
    store!.dispatch({
      type: `${actionIdentifier}_${loadFullStateActionName}`,
      state: fullState,
      _reactant: actionIdentifier,
    });
    if (typeof fullState === 'undefined') {
      throw new Error(``);
    }
    this.lastAction.sequence = fullState[this.lastAction.stateKey]._sequence;
  }
}
