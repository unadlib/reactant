import React, { ReactChildren, FunctionComponent } from 'react';
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
  autoProvide?: boolean;
}
// todo support ssr and router config
@injectable()
class ReactantRouter extends PluginModule {
  autoProvide: boolean;

  constructor(@optional(RouterOptions) public options: IRouterOptions) {
    super();
    const { autoProvide = true } = this.options || {};
    this.autoProvide = autoProvide;
  }

  history = createBrowserHistory();

  middleware = routerMiddleware(this.history);

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    if (reducers.router) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `'reactant-router' reducer name must be 'router', A module with the property name 'router' already exists, please modify the module 'name'.`
        );
      }
    }
    return Object.assign(reducers, {
      router: connectRouter(this.history),
    });
  }

  ConnectedRouter: FunctionComponent = props => (
    <ConnectedRouter history={this.history}>{props.children}</ConnectedRouter>
  );

  get router(): RouterState {
    return this[storeKey]?.getState().router;
  }

  get currentPath() {
    return this.router.location.pathname;
  }

  afterCreateStore(store: Store) {
    Object.defineProperties(this, {
      [storeKey]: {
        enumerable: false,
        configurable: false,
        get() {
          return store;
        },
      },
    });
  }

  provider(props: { children: ReactChildren }) {
    if (!this.autoProvide) return <>{props.children}</>;
    return <this.ConnectedRouter>{props.children}</this.ConnectedRouter>;
  }
}

export { ReactantRouter as Router, RouterOptions };
