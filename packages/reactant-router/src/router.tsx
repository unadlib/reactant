/* eslint-disable consistent-return */
import React, { PropsWithChildren, FunctionComponent } from 'react';
import { PluginModule, injectable, inject, storeKey } from 'reactant-module';
import { ReducersMapObject, Store } from 'redux';
import {
  connectRouter,
  ConnectedRouter,
  CALL_HISTORY_METHOD,
  LOCATION_CHANGE,
  RouterAction,
  onLocationChanged,
} from 'connected-react-router';
import type { Location, LocationState, Action, History } from 'history';

export {
  createHashHistory,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';

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
   * Define a string as Router reducer key.
   */
  stateKey?: string;
  /**
   * auto create history and handle middleware
   */
  autoCreateHistory?: boolean;
}

// TODO: support ssr and router config
@injectable()
abstract class BaseReactantRouter extends PluginModule {
  readonly [storeKey]?: Store;

  autoProvide: boolean;

  stateKey: string;

  protected history!: History;

  abstract push(path: string, state?: Record<string, any>): void;

  abstract replace(
    path: string,
    state?: Record<string, any>
  ): Promise<void> | void;

  abstract go(n: number): Promise<void> | void;

  abstract goBack(): Promise<void> | void;

  abstract goForward(): Promise<void> | void;

  autoCreateHistory: boolean;

  onLocationChanged = onLocationChanged;

  constructor(@inject(RouterOptions) protected options: IRouterOptions) {
    super();
    const { autoProvide = true, stateKey = 'router' } = this.options || {};
    this.autoProvide = autoProvide;
    this.stateKey = stateKey;
    this.autoCreateHistory = this.options?.autoCreateHistory ?? true;
    if (this.autoCreateHistory) {
      this.history = this.options.createHistory();
      this.middleware = (store) => (next) => (action: RouterAction) => {
        if (action.type !== CALL_HISTORY_METHOD) {
          if (
            action.type === LOCATION_CHANGE &&
            action?.payload?.isFirstRendering === false &&
            this.history.location !== action.payload.location
          ) {
            this.history.replace(action.payload.location);
          }
          return next(action);
        }
        const {
          payload: { method, args = [] },
        } = action;
        const history: Record<string, Function> = this.history as any;
        history[method](...args);
      };
    }
  }

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    if (!this.autoCreateHistory) return reducers;
    if (Object.prototype.hasOwnProperty.call(reducers, this.stateKey)) {
      throw new Error(
        `The identifier '${this.stateKey}' has a duplicate name, please reset the option 'stateKey' of 'ReactantRouter' module.`
      );
    }
    return Object.assign(reducers, {
      [this.stateKey]: connectRouter(this.history),
    });
  }

  ConnectedRouter: FunctionComponent = (props) => (
    <ConnectedRouter history={this.history}>{props.children}</ConnectedRouter>
  );

  get router(): RouterState {
    return this[storeKey]?.getState()[this.stateKey];
  }

  get currentPath() {
    return this.router?.location.pathname;
  }

  provider = (props: PropsWithChildren<any>) => {
    if (!this.autoProvide) return <>{props.children}</>;
    return <this.ConnectedRouter>{props.children}</this.ConnectedRouter>;
  };
}

@injectable()
class ReactantRouter extends BaseReactantRouter {
  constructor(@inject(RouterOptions) public options: IRouterOptions) {
    super(options);
  }

  push(path: string, state?: Record<string, any>) {
    this.history.push(path, state);
  }

  replace(path: string, state?: Record<string, any>) {
    this.history.replace(path, state);
  }

  go(n: number) {
    this.history.go(n);
  }

  goBack() {
    this.history.goBack();
  }

  goForward() {
    this.history.goForward();
  }
}

export { ReactantRouter as Router, RouterOptions, BaseReactantRouter };
