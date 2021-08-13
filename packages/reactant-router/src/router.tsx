import React, { PropsWithChildren, FunctionComponent } from 'react';
import { PluginModule, injectable, optional, storeKey } from 'reactant-module';
import { ReducersMapObject, Store } from 'redux';
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router';
import { createBrowserHistory, Location, LocationState, Action } from 'history';

const RouterOptions = Symbol('RouterOptions');

interface RouterState {
  action: Action;
  location: Location<LocationState>;
}

export interface IRouterOptions {
  /**
   * Auto provider injection.
   */
  autoProvide?: boolean;
  /**
   * Define a string as Router reducer key.
   */
  stateKey?: string;
}

// TODO: support ssr and router config
@injectable()
class ReactantRouter extends PluginModule {
  readonly [storeKey]?: Store;

  autoProvide: boolean;

  stateKey: string;

  constructor(@optional(RouterOptions) public options: IRouterOptions) {
    super();
    const { autoProvide = true, stateKey = 'router' } = this.options || {};
    this.autoProvide = autoProvide;
    this.stateKey = stateKey;
  }

  history = createBrowserHistory();

  middleware = routerMiddleware(this.history);

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
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
    return this.router.location.pathname;
  }

  provider = (props: PropsWithChildren<any>) => {
    if (!this.autoProvide) return <>{props.children}</>;
    return <this.ConnectedRouter>{props.children}</this.ConnectedRouter>;
  };
}

export { ReactantRouter as Router, RouterOptions };
