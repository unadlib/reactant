/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import {
  injectable,
  inject,
  watch,
  state,
  action,
  stateKey,
  modulesKey,
} from 'reactant';
import { Router as BaseReactantRouter, RouterOptions } from 'reactant-router';
import type {
  IRouterOptions as IBaseRouterOptions,
  RouterState,
} from 'reactant-router';
import type { LocationState } from 'history';
import {
  routerModuleName,
  SharedAppOptions,
  storageModuleName,
  syncRouterName,
  syncWorkerRouterName,
} from '../constants';
import type { ISharedAppOptions } from '../interfaces';
import { PortDetector } from './portDetector';
import { spawn } from '../spawn';
import { fork } from '../fork';

export {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from 'reactant-router';

export interface IRouterOptions extends IBaseRouterOptions {
  /**
   * default initial route
   */
  defaultRoute?: string;
}

@injectable({
  name: routerModuleName,
})
class ReactantRouter extends BaseReactantRouter {
  private passiveRoute = false;

  constructor(
    protected portDetector: PortDetector,
    @inject(SharedAppOptions) protected sharedAppOptions: ISharedAppOptions,
    @inject(RouterOptions) protected options: IRouterOptions
  ) {
    super({
      ...options,
      autoCreateHistory: !(
        (sharedAppOptions.type === 'SharedWorker' &&
          sharedAppOptions.port === 'server') ||
        !globalThis.document
      ),
    });

    if (globalThis.document) {
      window.addEventListener('popstate', () => {
        if (!this.passiveRoute) {
          this.lastRoutedTimestamp = Date.now();
        }
      });
    }

    if (!this.portDetector.shared) {
      const stopWatching = this.watchRehydratedRouting();
      watch(
        this,
        () => this.router,
        () => {
          if (this.router) {
            // just update the current router to routers mapping by name
            this._setRouters(this.portDetector.name, this.router);
          }
          if (!this.enableCacheRouting) {
            stopWatching();
          }
        }
      );
    }

    this.portDetector.onClient(() => {
      if (!this.portDetector.sharedAppOptions.forcedSyncClient) {
        const visibilitychange = async () => {
          if (document.visibilityState === 'visible') {
            await this.portDetector.syncFullState({ forceSync: false });
            if (this.toBeRouted) {
              const fn = this.toBeRouted;
              this.toBeRouted = null;
              fn();
            }
          }
        };
        document.addEventListener('visibilitychange', visibilitychange);
        return () => {
          document.removeEventListener('visibilitychange', visibilitychange);
        };
      }
    });

    // #region sync init router from clients in Worker mode
    this.portDetector.onServer((transport) => {
      if (this.portDetector.isWorkerMode && !this.enableCacheRouting) {
        transport
          .emit(syncWorkerRouterName, this.portDetector.name)
          .then((router) => {
            if (router) {
              this._changeRoutingOnSever(
                this.portDetector.name,
                router,
                Date.now()
              );
            }
          });
      } else if (this.enableCacheRouting) {
        return this.watchRehydratedRouting();
      }
    });
    this.portDetector.onClient((transport) => {
      if (this.portDetector.isWorkerMode) {
        return transport.listen(syncWorkerRouterName, async (name) => {
          if (name === this.portDetector.name) {
            return this.router;
          }
        });
      }
    });
    // #endregion

    // #region watch router and sync up router to all clients and server port
    this.portDetector.onClient(() => {
      return watch(
        this,
        () => this.router,
        () => {
          spawn(this as any, '_changeRoutingOnSever', [
            this.portDetector.name,
            this.router,
            this.lastRoutedTimestamp,
            this.portDetector.clientId,
          ]);
        }
      );
    });
    this.portDetector.onServer(() => {
      return watch(
        this,
        () => this.router,
        () => {
          if (!this.portDetector.isWorkerMode) {
            fork(
              this as any,
              '_changeRoutingOnClient',
              [this.portDetector.name, this.router, this.lastRoutedTimestamp],
              {
                silent: true,
              }
            );
          }
        }
      );
    });
    // #endregion

    // #region sync init router from server port in all modes
    this.portDetector.onServer((transport) => {
      const rehydratedPromise = this.enableCacheRouting
        ? new Promise<void>((resolve) => {
            const stopWatching = watch(
              this,
              () => (this as any)[stateKey]._persist?.rehydrated,
              (rehydrated) => {
                if (rehydrated) {
                  stopWatching();
                  resolve();
                }
              }
            );
          })
        : Promise.resolve();
      return transport!.listen(
        syncRouterName,
        async (name, timestamp, router) => {
          await rehydratedPromise;
          const currentRouter = this._routers[name]!;
          if (!currentRouter && router) {
            this._changeRoutingOnSever(name, router, timestamp);
          }
          return currentRouter;
        }
      );
    });
    this.portDetector.onClient((transport) => {
      transport!
        .emit(
          syncRouterName,
          this.portDetector.name,
          this.lastRoutedTimestamp,
          this.router
        )
        .then((router) => {
          if (!router) return;
          this.passiveRoute = true;
          this.history.replace(router.location);
          this.passiveRoute = false;
        });
    });
    // #endregion
  }

  watchRehydratedRouting() {
    const stopWatching = watch(
      this,
      () => (this as any)[stateKey]._persist?.rehydrated,
      (rehydrated) => {
        if (rehydrated) {
          stopWatching();
          const router = this._routers[this.portDetector.name];
          this._changeRoutingOnSever(
            this.portDetector.name,
            router ?? this.defaultHistory,
            Date.now()
          );
        }
      }
    );
    return stopWatching;
  }

  /**
   * The timestamp of the last routing.
   */
  lastRoutedTimestamp = Date.now();

  protected _changeRoutingOnSever(
    name: string,
    router: RouterState,
    timestamp: number,
    clientId?: string
  ) {
    if (!this.portDetector.isServerWorker && globalThis.document) {
      // Only update the latest routes
      if (this.lastRoutedTimestamp >= timestamp) return;
      this.lastRoutedTimestamp = timestamp;
    }
    this._setRouters(name, router);
    if (name === this.portDetector.name) {
      if (this.portDetector.isWorkerMode) {
        this.dispatchChanged(router);
      } else if (
        this.history.createHref(router.location) !==
        this.history.createHref(this.router!.location)
      ) {
        this.passiveRoute = true;
        this.history.push(router.location);
        this.passiveRoute = false;
      }
      if (this.portDetector.shared) {
        fork(
          this as any,
          '_changeRoutingOnClient',
          [this.portDetector.name, this.router, timestamp],
          {
            silent: true,
            clientIds: clientId
              ? //  Skip routing the origin of the client
                this.portDetector.clientIds.filter((id) => id !== clientId)
              : undefined,
          }
        );
      }
    } else if (this.portDetector.shared) {
      fork(this as any, '_changeRoutingOnClient', [name, router, timestamp], {
        silent: true,
        clientIds: clientId
          ? //  Skip routing the origin of the client
            this.portDetector.clientIds.filter((id) => id !== clientId)
          : undefined,
      });
    }
  }

  protected _changeRoutingOnClient(
    name: string,
    router: RouterState,
    timestamp?: number
  ) {
    // if the client is the non-origin of the routing, skip it
    // or if the timestamp of the routing is earlier than the last routing, skip it
    if (
      name !== this.portDetector.name ||
      (timestamp && this.lastRoutedTimestamp >= timestamp)
    )
      return;
    const route = () => {
      if (
        this.history &&
        this.history.createHref(router.location) !==
          this.history.createHref(this.router!.location)
      ) {
        this.passiveRoute = true;
        this.history.push(router.location);
        this.passiveRoute = false;
      }
    };
    if (this.portDetector.disableSyncClient) {
      this.toBeRouted = route;
    } else {
      route();
    }
  }

  protected _makeRoutingOnClient({
    args,
    action,
    name,
  }: {
    args: any[];
    action: 'push' | 'replace' | 'go' | 'goBack' | 'goForward';
    name: string;
  }) {
    return new Promise((resolve) => {
      const route = () => {
        if (name === this.portDetector.name) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          super[action](...args);
          resolve(this.router);
        }
      };
      if (this.portDetector.disableSyncClient) {
        this.toBeRouted = route;
      } else {
        route();
      }
    });
  }

  toBeRouted: (() => void) | null = null;

  @state
  protected _routers: Record<string, RouterState | undefined> = {
    [this.portDetector.name]: this.router,
  };

  @action
  protected _setRouters(name: string, router: RouterState) {
    if (
      !this.enableCacheRouting ||
      (this.enableCacheRouting && (this as any)[stateKey]._persist?.rehydrated)
    ) {
      this._routers[name] = router;
    }
  }

  // The server port routing state is received asynchronously, so there should be a default route.
  protected get defaultRoute() {
    return this.options.defaultRoute ?? '/';
  }

  protected get enableCacheRouting() {
    const Storage = (this as any)[modulesKey][storageModuleName];
    const routerPersistConfig = Storage?.persistConfig[routerModuleName];
    return (
      routerPersistConfig &&
      (routerPersistConfig!.whitelist?.includes('_routers') ||
        routerPersistConfig!.blacklist?.includes('_routers') === false)
    );
  }

  protected defaultHistory = {
    action: 'POP',
    location: {
      pathname: this.defaultRoute,
      search: '',
      hash: '',
      state: undefined,
    },
  } as RouterState;

  protected dispatchChanged(router: RouterState) {
    this.store?.dispatch(
      this.onLocationChanged(router.location, router.action)!
    );
  }

  get currentPath() {
    return this.router?.location.pathname ?? this.defaultRoute;
  }

  async push(path: string, locationState?: LocationState) {
    if (this.portDetector.isServerWorker) {
      const router: RouterState = await fork(
        this as any,
        '_makeRoutingOnClient',
        [
          {
            args: [path, locationState],
            action: 'push',
            name: this.portDetector.name,
          },
        ]
      );
      this.dispatchChanged(router);
    } else {
      this.lastRoutedTimestamp = Date.now();
      super.push(path, locationState);
    }
  }

  async replace(path: string, locationState?: LocationState) {
    if (this.portDetector.isServerWorker) {
      const router: RouterState = await fork(
        this as any,
        '_makeRoutingOnClient',
        [
          {
            args: [path, locationState],
            action: 'replace',
            name: this.portDetector.name,
          },
        ]
      );
      this.dispatchChanged(router);
    } else {
      this.lastRoutedTimestamp = Date.now();
      super.replace(path, locationState);
    }
  }

  async go(n: number) {
    if (this.portDetector.isServerWorker) {
      const router: RouterState = await fork(
        this as any,
        '_makeRoutingOnClient',
        [
          {
            args: [n],
            action: 'go',
            name: this.portDetector.name,
          },
        ]
      );
      this.dispatchChanged(router);
    } else {
      this.lastRoutedTimestamp = Date.now();
      super.go(n);
    }
  }

  async goBack() {
    if (this.portDetector.isServerWorker) {
      const router: RouterState = await fork(
        this as any,
        '_makeRoutingOnClient',
        [
          {
            args: [],
            action: 'goBack',
            name: this.portDetector.name,
          },
        ]
      );
      this.dispatchChanged(router);
    } else {
      this.lastRoutedTimestamp = Date.now();
      super.goBack();
    }
  }

  async goForward() {
    if (this.portDetector.isServerWorker) {
      const router: RouterState = await fork(
        this as any,
        '_makeRoutingOnClient',
        [
          {
            args: [],
            action: 'goForward',
            name: this.portDetector.name,
          },
        ]
      );
      this.dispatchChanged(router);
    } else {
      this.lastRoutedTimestamp = Date.now();
      super.goForward();
    }
  }
}

export { ReactantRouter as Router, RouterOptions };
