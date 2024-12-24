/* eslint-disable consistent-return */
import React, { PropsWithChildren, FunctionComponent } from 'react';
import {
  PluginModule,
  injectable,
  inject,
  storeKey,
  signalMapKey,
  type Service,
  signal,
  enableAutoComputedKey,
  type Signal,
} from 'reactant-module';
import type { ReducersMapObject } from 'redux';
import {
  connectRouter,
  ConnectedRouter,
  CALL_HISTORY_METHOD,
  RouterAction,
  onLocationChanged,
  routerActions,
} from 'connected-react-router';
import type { Location, LocationState, Action, History } from 'history';

export {
  createHashHistory,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';

export { LOCATION_CHANGE } from 'connected-react-router';
export type { LocationChangeAction } from 'connected-react-router';

const RouterOptions = Symbol('RouterOptions');

export interface RouterState {
  action: Action;
  location: Location<LocationState>;
}

export interface IRouterOptions {
  /**
   * create history for router, use `createHashHistory`/`createBrowserHistory`/`createMemoryHistory`
   */
  createHistory: () => History;
  /**
   * Auto provider injection.
   */
  autoProvide?: boolean;
  /**
   * auto create history and handle middleware
   */
  autoCreateHistory?: boolean;
}

// TODO: support ssr and router config
@injectable({
  name: 'Router',
})
class ReactantRouter extends PluginModule {
  autoProvide: boolean;

  protected history!: History;

  autoCreateHistory: boolean;

  onLocationChanged = onLocationChanged;

  routerActions = routerActions;

  protected readonly stateKey = 'router';

  constructor(@inject(RouterOptions) protected options: IRouterOptions) {
    super();
    const { autoProvide = true } = this.options || {};
    this.autoProvide = autoProvide;
    this.autoCreateHistory = this.options?.autoCreateHistory ?? true;
    if (this.autoCreateHistory) {
      this.history = this.options.createHistory();
      this.middleware = (store) => (next) => (action: RouterAction) => {
        if (action.type !== CALL_HISTORY_METHOD) {
          return next(action);
        }
        // Just call `history` method and `history` will change routing, then trigger `history.listen`, and dispatch LOCATION_CHANGE action
        const {
          payload: { method, args = [] },
        } = action;
        const history: Record<string, Function> = this.history as any;
        history[method](...args);
      };
    }
  }

  get store() {
    return this[storeKey];
  }

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    if (Object.prototype.hasOwnProperty.call(reducers, this.stateKey)) {
      throw new Error(
        `The identifier '${this.stateKey}' has a duplicate name, please reset the option 'stateKey' of 'ReactantRouter' module.`
      );
    }
    if ((this as Service)[enableAutoComputedKey]) {
      const signalMap: Record<string, Signal> =
        (this as Service)[signalMapKey] ?? {};
      signalMap[this.stateKey] = signal({});
      const current = signalMap[this.stateKey];
      if (!(this as Service)[signalMapKey]) {
        Object.defineProperties(this, {
          [signalMapKey]: {
            enumerable: false,
            configurable: false,
            writable: false,
            value: signalMap,
          },
        });
      }
      const reducer = connectRouter(this.history ?? this.defaultHistory);
      return Object.assign(reducers, {
        // TODO: fix type
        [this.stateKey]: (state: any, action: any) => {
          const result = reducer(state, action);
          if (result !== state) {
            // update signal value for auto-computed
            current.value = result;
          }
          return result;
        },
      });
    }
    return Object.assign(reducers, {
      [this.stateKey]: connectRouter(this.history ?? this.defaultHistory),
    });
  }

  protected defaultHistory?: {
    location: History['location'];
    action: string;
  };

  ConnectedRouter: FunctionComponent = (props) => (
    <ConnectedRouter history={this.history}>{props.children}</ConnectedRouter>
  );

  get router(): RouterState | undefined {
    if ((this as Service)[enableAutoComputedKey]) {
      const currentRouter = (this as Service)[signalMapKey]?.[this.stateKey];
      if (currentRouter) {
        return currentRouter!.value as RouterState;
      }
    }
    return this.store?.getState()[this.stateKey];
  }

  get currentPath() {
    return this.router?.location.pathname;
  }

  push(path: string, state?: LocationState) {
    this.store?.dispatch(this.routerActions.push(path, state));
  }

  replace(path: string, state?: LocationState) {
    this.store?.dispatch(this.routerActions.replace(path, state));
  }

  go(n: number) {
    this.store?.dispatch(this.routerActions.go(n));
  }

  goBack() {
    this.store?.dispatch(this.routerActions.goBack());
  }

  goForward() {
    this.store?.dispatch(this.routerActions.goForward());
  }

  provider = (props: PropsWithChildren<any>) => {
    if (!this.autoProvide) return props.children;
    return <this.ConnectedRouter>{props.children}</this.ConnectedRouter>;
  };
}

export { ReactantRouter as Router, RouterOptions };
