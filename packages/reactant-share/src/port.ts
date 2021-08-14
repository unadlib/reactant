import { injectable, inject } from 'reactant';
import { CallbackWithHook, Port, PortApp, Transports } from './interfaces';

export const PortDetectorOptions = Symbol('PortDetectorOptions');

interface IPortDetectorOptions {
  get(): PortApp;
  set(app: PortApp): void;
}

@injectable()
export class PortDetector {
  private lastHooks?: Set<ReturnType<CallbackWithHook>>;

  constructor(
    @inject(PortDetectorOptions) private options: IPortDetectorOptions
  ) {}

  private detectPort(port: Port) {
    return this.options.get()?.[port];
  }

  get isServer() {
    return !!this.detectPort('server');
  }

  get isClient() {
    return !!this.detectPort('client');
  }

  setPort(
    currentPortApp: PortApp,
    callbacks: Set<CallbackWithHook>,
    transport: Transports[keyof Transports]
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
    this.options.set(currentPortApp);
    for (const callback of callbacks) {
      try {
        const hook = callback(transport);
        this.lastHooks.add(hook);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
