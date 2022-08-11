/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable, storeKey, inject, state, action, watch } from 'reactant';
import { BaseReactantRouter, RouterOptions } from 'reactant-router';
import type {
  IRouterOptions as IBaseRouterOptions,
  RouterState,
} from 'reactant-router';
import type { History, LocationState } from 'history';
import {
  routerChangeName,
  SharedAppOptions,
  syncRouterName,
  syncRouterWorkerName,
} from './constants';
import { ISharedAppOptions } from './interfaces';
import { PortDetector } from './portDetector';
import { spawn } from './spawn';

export {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from 'reactant-router';

export type RouterChangeNameOptions =
  | {
      method: 'push';
      args: [string, LocationState?];
      currentName?: string;
    }
  | {
      method: 'replace';
      args: [string, LocationState?];
      currentName?: string;
    }
  | {
      method: 'go';
      args: [number];
      currentName?: string;
    }
  | {
      method: 'goBack';
      args: [];
      currentName?: string;
    }
  | {
      method: 'goForward';
      args: [];
      currentName?: string;
    };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRouterOptions extends IBaseRouterOptions {
  /**
   * default initial route
   */
  defaultRoute?: string;
  /**
   * name of router
   */
  name?: string;
}

@injectable({
  name: 'reactant:router',
})
class ReactantRouter extends BaseReactantRouter {
  protected name = this.options.name ?? 'default';

  constructor(
    protected portDetector: PortDetector,
    @inject(SharedAppOptions) protected sharedAppOptions: ISharedAppOptions,
    @inject(RouterOptions) protected options: IRouterOptions
  ) {
    super({
      ...options,
      autoCreateHistory: !(
        sharedAppOptions.type === 'SharedWorker' &&
        sharedAppOptions.port === 'server'
      ),
    });

    this.portDetector.onServer((transport) => {
      return transport!.listen(
        syncRouterName,
        async (name) => this._routers[name]
      );
    });
    this.portDetector.onClient((transport) => {
      transport!.emit(syncRouterName, this.name).then((router) => {
        if (!router) return;
        this[storeKey]?.dispatch(
          this.onLocationChanged(router.location, 'REPLACE')!
        );
      });
    });

    if (this.portDetector.isWorkerMode) {
      this.portDetector.onServer((transport) => {
        const history: History = {
          push: async (path: string, locationState?: LocationState) => {
            const { currentName } = this;
            const router = await transport.emit(routerChangeName, {
              method: 'push',
              args: [path, locationState],
              currentName,
            });
            if (router && currentName) {
              this._setRouters(currentName, router);
            }
          },
          replace: async (path: string, locationState?: LocationState) => {
            const { currentName } = this;
            const router = await transport.emit(routerChangeName, {
              method: 'replace',
              args: [path, locationState],
              currentName,
            });
            if (router && currentName) {
              this._setRouters(currentName, router);
            }
          },
          go: async (n: number) => {
            const { currentName } = this;
            const router = await transport.emit(routerChangeName, {
              method: 'go',
              args: [n],
              currentName,
            });
            if (router && currentName) {
              this._setRouters(currentName, router);
            }
          },
          goBack: async () => {
            const { currentName } = this;
            const router = await transport.emit(routerChangeName, {
              method: 'goBack',
              args: [],
              currentName,
            });
            if (router && currentName) {
              this._setRouters(currentName, router);
            }
          },
          goForward: async () => {
            const { currentName } = this;
            const router = await transport.emit(routerChangeName, {
              method: 'goForward',
              args: [],
              currentName,
            });
            if (router && currentName) {
              this._setRouters(currentName, router);
            }
          },
        } as any;
        this.history = history;
        transport.listen(syncRouterWorkerName, (router, name) => {
          if (!this._router && router && name === this.name) {
            this._setRouters(name, router);
          }
        });
      });
      this.portDetector.onClient((transport) => {
        transport.emit(
          { name: syncRouterWorkerName, respond: false },
          this.router,
          this.name
        );
        return transport.listen(
          routerChangeName,
          async ({ method, args = [], currentName }) => {
            return new Promise((resolve) => {
              if (currentName !== this.name) return;
              if (this.portDetector.disableSyncClient) {
                this.toBeRouted = () => {
                  const fn: Function = this.history[method];
                  fn(...args);
                };
                return;
              }
              const stopWatching = watch(
                this,
                () => this.router,
                () => {
                  stopWatching();
                  resolve(this.router);
                }
              );
              const fn: Function = this.history[method];
              fn(...args);
            });
          }
        );
      });
    }
  }

  toBeRouted: (() => void) | null = null;

  @state
  private _routers: Record<string, RouterState> = {};

  @action
  private _setRouters(name: string, router: RouterState) {
    this._routers[name] = router;
  }

  private get _router() {
    return this._routers[this.name];
  }

  // The server port routing state is received asynchronously, so there should be a default route.
  protected get defaultRoute() {
    return this.options.defaultRoute ?? '/';
  }

  get currentPath(): string {
    return this.router?.location.pathname ?? this.defaultRoute;
  }

  get router(): RouterState {
    return this.portDetector.isServer && this.portDetector.isWorkerMode
      ? this._router
      : this[storeKey]?.getState().router;
  }

  private currentName?: string;

  private async _push(
    path: string,
    locationState: LocationState,
    name: string
  ) {
    if (this.portDetector.isServer) {
      this.currentName = name;
    }
    await this.history.push(path, locationState);
  }

  private async _replace(
    path: string,
    locationState: LocationState,
    name: string
  ) {
    if (this.portDetector.isServer) {
      this.currentName = name;
    }
    await this.history.replace(path, locationState);
  }

  private async _go(n: number, name: string) {
    if (this.portDetector.isServer) {
      this.currentName = name;
    }
    await this.history.go(n);
  }

  private async _goBack(name: string) {
    if (this.portDetector.isServer) {
      this.currentName = name;
    }
    await this.history.goBack();
  }

  private async _goForward(name: string) {
    if (this.portDetector.isServer) {
      this.currentName = name;
    }
    await this.history.goForward();
  }

  async push(path: string, locationState?: LocationState) {
    await spawn(this as any, '_push', [path, locationState, this.name]);
  }

  async replace(path: string, locationState?: LocationState) {
    await spawn(this as any, '_replace', [path, locationState, this.name]);
  }

  async go(n: number) {
    await spawn(this as any, '_go', [n, this.name]);
  }

  async goBack() {
    await spawn(this as any, '_goBack', [this.name]);
  }

  async goForward() {
    await spawn(this as any, '_goForward', [this.name]);
  }
}

export { ReactantRouter as Router, RouterOptions };
