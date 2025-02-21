/* eslint-disable prefer-destructuring */
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
import {
  Router as BaseReactantRouter,
  LOCATION_CHANGE,
  RouterOptions,
} from 'reactant-router';
import type {
  IRouterOptions as IBaseRouterOptions,
  LocationChangeAction,
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
import { delegate } from '../delegate';
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
  /**
   *  The maximum number of historical records stored in the browser, the default is 10.
   */
  maxHistoryLength?: number;
}

@injectable({
  name: routerModuleName,
})
class ReactantRouter extends BaseReactantRouter {
  private passiveRoute = false;

  private cachedHistory: RouterState[] = [];

  private forwardHistory: RouterState[] = [];

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

    this.portDetector.onClient(() => {
      const stopWatching = watch(
        this,
        () => this.portDetector.lastAction.action,
        () => {
          const action = this.portDetector.lastAction
            .action as any as LocationChangeAction;
          if (
            action.type === LOCATION_CHANGE &&
            action.payload.isFirstRendering
          ) {
            const router = this._routers[this.portDetector.name];
            if (
              router &&
              this.history.createHref(router.location) !==
                this.history.createHref(this.router!.location)
            ) {
              stopWatching();
              // router reducer @@router/LOCATION_CHANGE event and syncFullState event The events may be out of order, so we re-check route consistency after synchronizing the state.
              this.history.replace(router.location);
            }
          }
        }
      );
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
      watch(
        this,
        () => this.router,
        (router) => {
          if (
            router &&
            router.location.pathname !==
              this.cachedHistory[0]?.location?.pathname
          ) {
            if (router.action === 'REPLACE') {
              this.cachedHistory[0] = router;
            } else {
              this.cachedHistory.unshift(router!);
            }
            this.cachedHistory.length = this.maxHistoryLength; // Limit the length of the historical stack
          }
        }
      );
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
          delegate(this as any, '_changeRoutingOnSever', [
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
            if (globalThis.document) {
              // just update the current router to routers mapping by name at every time in shared tab mode
              this._setRouters(this.portDetector.name, this.router!);
            }
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

  get maxHistoryLength() {
    return this.options.maxHistoryLength ?? 50;
  }

  watchRehydratedRouting() {
    // The first rendering and the hydration of the persistent router may emit actions in a different order due to the module order.
    let firstTrigger = false;
    const stopWatchingRehydrated = watch(
      this,
      () => (this as any)[stateKey]._persist?.rehydrated,
      (rehydrated) => {
        if (!this.enableCacheRouting) {
          stopWatchingRehydrated();
        }
        if (rehydrated) {
          stopWatchingRehydrated();
          if (!firstTrigger) {
            firstTrigger = true;
            return;
          }
          const router = this._routers[this.portDetector.name];
          this._changeRoutingOnSever(
            this.portDetector.name,
            router ?? this.defaultHistory,
            Date.now()
          );
        }
      }
    );
    const stopWatchingIsFirstRendering = watch(
      this,
      () => this.portDetector.lastAction.action,
      () => {
        if (!this.enableCacheRouting) {
          stopWatchingIsFirstRendering();
        }
        const action = this.portDetector.lastAction
          .action as any as LocationChangeAction;
        if (
          action.type === LOCATION_CHANGE &&
          action.payload.isFirstRendering
        ) {
          stopWatchingIsFirstRendering();
          if (!firstTrigger) {
            firstTrigger = true;
            return;
          }
          const router = this._routers[this.portDetector.name];
          this._changeRoutingOnSever(
            this.portDetector.name,
            router ?? this.defaultHistory,
            Date.now()
          );
        }
      }
    );
    return () => {
      stopWatchingRehydrated();
      stopWatchingIsFirstRendering();
    };
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

  protected dispatchChanged(router?: RouterState) {
    if (!router) return;
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

  async go(n: number): Promise<void> {
    if (!this.portDetector.shared) {
      this.lastRoutedTimestamp = Date.now();
      super.go(n);
      return;
    }
    if (this.portDetector.isClient) {
      return delegate(this as ReactantRouter, 'go', [n]);
    }
    if (n < 0) {
      // Navigate backward (like goBack)
      const stepsBack = Math.abs(n);
      if (this.cachedHistory.length > stepsBack) {
        // Pop the current route to the forward history stack
        const currentRouter = this.cachedHistory.shift();
        this.forwardHistory.unshift(currentRouter!); // Add to forward history

        // Get the target router (stepsBack-th item)
        const targetRouter = this.cachedHistory[stepsBack - 1];

        if (targetRouter) {
          const router: RouterState = await fork(
            this as any,
            '_makeRoutingOnClient',
            [
              {
                args: [
                  targetRouter.location.pathname,
                  targetRouter.location.state,
                ],
                action: 'replace',
                name: this.portDetector.name,
              },
            ]
          );
          this.dispatchChanged(router);
        } else {
          console.warn('No more history to go back.');
        }
      } else {
        console.warn('No more history to go back.');
      }
    } else if (n > 0) {
      // Navigate forward (like goForward)
      const stepsForward = n;
      if (this.forwardHistory.length >= stepsForward) {
        const targetRouter = this.forwardHistory[stepsForward - 1];
        if (targetRouter) {
          const router: RouterState = await fork(
            this as any,
            '_makeRoutingOnClient',
            [
              {
                args: [
                  targetRouter.location.pathname,
                  targetRouter.location.state,
                ],
                action: 'replace',
                name: this.portDetector.name,
              },
            ]
          );
          this.dispatchChanged(router);
        } else {
          console.warn('No more history to go forward.');
        }
        // Remove the used entry from the forward stack
        this.forwardHistory.splice(0, stepsForward);
      } else {
        console.warn('No more history to go forward.');
      }
    } else {
      // Go to the current route (refresh the page)
      console.warn('Going to the current route (n = 0) does nothing.');
    }
  }

  async goBack(): Promise<void> {
    if (!this.portDetector.shared) {
      this.lastRoutedTimestamp = Date.now();
      super.goBack();
      return;
    }
    if (this.portDetector.isClient) {
      return delegate(this as ReactantRouter, 'goBack', []);
    }
    if (this.cachedHistory.length > 1) {
      const currentRouter = this.cachedHistory.shift(); // Pop the current route
      this.forwardHistory.unshift(currentRouter!); // Push to forward stack
      this.forwardHistory.length = this.maxHistoryLength; // Limit the length of the forward stack
      const previousRouter = this.cachedHistory[0]; // Get the previous route
      if (previousRouter) {
        const router: RouterState = await fork(
          this as any,
          '_makeRoutingOnClient',
          [
            {
              args: [
                previousRouter.location.pathname,
                previousRouter.location.state,
              ],
              action: 'replace',
              name: this.portDetector.name,
            },
          ]
        );
        this.dispatchChanged(router);
      } else {
        console.warn('No forward route available.');
      }
    } else {
      console.warn('No previous route available.');
    }
  }

  async goForward(): Promise<void> {
    if (!this.portDetector.shared) {
      this.lastRoutedTimestamp = Date.now();
      super.goForward();
      return;
    }
    if (this.portDetector.isClient) {
      return delegate(this as ReactantRouter, 'goForward', []);
    }
    if (this.forwardHistory.length > 0) {
      const nextRouter = this.forwardHistory.shift(); // Pop from forward stack
      if (nextRouter) {
        const router: RouterState = await fork(
          this as any,
          '_makeRoutingOnClient',
          [
            {
              args: [nextRouter.location.pathname, nextRouter.location.state],
              action: 'replace',
              name: this.portDetector.name,
            },
          ]
        );
        this.dispatchChanged(router);
      }
    } else {
      console.warn('No forward route available.');
    }
  }
}

export { ReactantRouter as Router, RouterOptions };
