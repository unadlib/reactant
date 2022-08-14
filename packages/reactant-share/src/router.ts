/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable, storeKey, inject, state, action, watch } from 'reactant';
import { BaseReactantRouter, RouterOptions } from 'reactant-router';
import type {
  IRouterOptions as IBaseRouterOptions,
  RouterState,
} from 'reactant-router';
import type { LocationState } from 'history';
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

    this.portDetector.onServer((transport) => {
      return transport.listen(syncRouterWorkerName, (router, name) => {
        if (!this.router && router && name === this.name) {
          this._setRouters(name, router);
        }
      });
    });
    this.portDetector.onClient((transport) => {
      transport.emit(
        { name: syncRouterWorkerName, respond: false },
        this._router,
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
              () => this._router,
              () => {
                stopWatching();
                resolve(this._router);
              }
            );
            if (this.portDetector.isWorkerMode) {
              const fn: Function = this.history[method];
              fn(...args);
            }
          });
        }
      );
    });
  }

  private async _route({ method, args, currentName }: RouterChangeNameOptions) {
    if (!this.portDetector.isWorkerMode) {
      if (!currentName || currentName === this.name) {
        const stopWatching = watch(
          this,
          () => this._router,
          () => {
            stopWatching();
            this._setRouters(currentName ?? this.name, this._router);
          }
        );
        const fn: Function = this.history[method];
        fn(...args);
      }
    }

    const routingPromise = this.portDetector.transports.server!.emit(
      routerChangeName,
      {
        method,
        args,
        currentName: currentName ?? this.name,
      } as RouterChangeNameOptions
    );
    if (currentName || this.portDetector.isWorkerMode) {
      const router = await routingPromise;
      if (router) {
        this._setRouters(currentName ?? this.name, router);
      }
    }
  }

  private get _router(): RouterState {
    return this[storeKey]?.getState().router;
  }

  toBeRouted: (() => void) | null = null;

  @state
  private _routers: Record<string, RouterState> = {};

  @action
  private _setRouters(name: string, router: RouterState) {
    this._routers[name] = router;
  }

  // The server port routing state is received asynchronously, so there should be a default route.
  protected get defaultRoute() {
    return this.options.defaultRoute ?? '/';
  }

  get currentPath(): string {
    return this.router?.location.pathname ?? this.defaultRoute;
  }

  get router(): RouterState {
    return this._routers[this.name];
  }

  private async _push(
    path: string,
    locationState: LocationState,
    name: string
  ) {
    await this._route({
      method: 'push',
      args: [path, locationState],
      currentName: name,
    });
  }

  private async _replace(
    path: string,
    locationState: LocationState,
    name: string
  ) {
    await this._route({
      method: 'replace',
      args: [path, locationState],
      currentName: name,
    });
  }

  private async _go(n: number, name: string) {
    await this._route({
      method: 'go',
      args: [n],
      currentName: name,
    });
  }

  private async _goBack(name: string) {
    await this._route({
      method: 'goBack',
      args: [],
      currentName: name,
    });
  }

  private async _goForward(name: string) {
    await this._route({
      method: 'goForward',
      args: [],
      currentName: name,
    });
  }

  async push(path: string, locationState?: LocationState) {
    await spawn(this as any, '_push', [path, locationState, this.clientName]);
  }

  async replace(path: string, locationState?: LocationState) {
    await spawn(this as any, '_replace', [
      path,
      locationState,
      this.clientName,
    ]);
  }

  async go(n: number) {
    await spawn(this as any, '_go', [n, this.clientName]);
  }

  async goBack() {
    await spawn(this as any, '_goBack', [this.clientName]);
  }

  async goForward() {
    await spawn(this as any, '_goForward', [this.clientName]);
  }

  get clientName() {
    return this.portDetector.isClient ? this.name : null;
  }
}

export { ReactantRouter as Router, RouterOptions };
