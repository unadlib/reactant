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
    }
  | {
      method: 'replace';
      args: [string, LocationState?];
    }
  | {
      method: 'go';
      args: [number];
    }
  | {
      method: 'goBack';
      args: [];
    }
  | {
      method: 'goForward';
      args: [];
    };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRouterOptions extends IBaseRouterOptions {
  defaultRoute?: string;
}

@injectable({
  name: 'reactant:router',
})
class ReactantRouter extends BaseReactantRouter {
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
        async () => this.router?.location
      );
    });
    this.portDetector.onClient((transport) => {
      transport!.emit(syncRouterName).then((location) => {
        if (!location) return;
        this[storeKey]?.dispatch(this.onLocationChanged(location, 'REPLACE')!);
      });
    });

    if (this.isWorker) {
      this.portDetector.onServer((transport) => {
        const history: History = {
          push: async (path: string, locationState?: LocationState) => {
            const router = await transport.emit(routerChangeName, {
              method: 'push',
              args: [path, locationState],
            });
            this._setRouter(router);
          },
          replace: async (path: string, locationState?: LocationState) => {
            const router = await transport.emit(routerChangeName, {
              method: 'replace',
              args: [path, locationState],
            });
            this._setRouter(router);
          },
          go: async (n: number) => {
            const router = await transport.emit(routerChangeName, {
              method: 'go',
              args: [n],
            });
            this._setRouter(router);
          },
          goBack: async () => {
            const router = await transport.emit(routerChangeName, {
              method: 'goBack',
              args: [],
            });
            this._setRouter(router);
          },
          goForward: async () => {
            const router = await transport.emit(routerChangeName, {
              method: 'goForward',
              args: [],
            });
            this._setRouter(router);
          },
        } as any;
        this.history = history;
        transport.listen(syncRouterWorkerName, (router) => {
          if (!this._router) {
            this._setRouter(router);
          }
        });
      });
      this.portDetector.onClient((transport) => {
        transport.emit(
          { name: syncRouterWorkerName, respond: false },
          this.router
        );
        return transport.listen(
          routerChangeName,
          async ({ method, args = [] }) => {
            return new Promise((resolve) => {
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

  @state
  private _router: RouterState | null = null;

  @action
  private _setRouter(router: RouterState) {
    this._router = router;
  }

  // The server port routing state is received asynchronously, so there should be a default route.
  protected get defaultRoute() {
    return this.options.defaultRoute ?? '/';
  }

  get currentPath(): string {
    return this.router?.location.pathname ?? this.defaultRoute;
  }

  private get isWorker() {
    return this.sharedAppOptions.type === 'SharedWorker';
  }

  get router(): RouterState {
    return this.portDetector.isServer && this.isWorker
      ? this._router
      : this[storeKey]?.getState()[this.stateKey];
  }

  private async _push(path: string, locationState?: LocationState) {
    await this.history.push(path, locationState);
  }

  private async _replace(path: string, locationState?: LocationState) {
    await this.history.replace(path, locationState);
  }

  private async _go(n: number) {
    await this.history.go(n);
  }

  private async _goBack() {
    await this.history.goBack();
  }

  private async _goForward() {
    await this.history.goForward();
  }

  async push(path: string, locationState?: LocationState) {
    await spawn(this as any, '_push', [path, locationState]);
  }

  async replace(path: string, locationState?: LocationState) {
    await spawn(this as any, '_replace', [path, locationState]);
  }

  async go(n: number) {
    await spawn(this as any, '_go', [n]);
  }

  async goBack() {
    await spawn(this as any, '_goBack', []);
  }

  async goForward() {
    await spawn(this as any, '_goForward', []);
  }
}

export { ReactantRouter as Router, RouterOptions };
