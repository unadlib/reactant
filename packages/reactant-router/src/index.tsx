import React, { ReactChildren, FunctionComponent } from 'react';
import { PluginModule, injectable, optional } from 'reactant-module';
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router';
import { createBrowserHistory } from 'history';

const RouterOptions = Symbol('RouterOptions');

export interface IRouterOptions {
  autoProvide?: boolean;
}

@injectable()
class ReactRouter extends PluginModule {
  autoProvide: boolean;

  constructor(@optional(RouterOptions) public options: IRouterOptions) {
    super();
    const { autoProvide = true } = this.options || {};
    this.autoProvide = autoProvide;
  }

  name = 'router';

  // todo extract `this.history` methods.
  history = createBrowserHistory();

  state = connectRouter(this.history);

  middleware = routerMiddleware(this.history);

  ConnectedRouter: FunctionComponent = props => (
    <ConnectedRouter history={this.history}>{props.children}</ConnectedRouter>
  );

  provider(props: { children: ReactChildren }) {
    if (!this.autoProvide) return <>{props.children}</>;
    return <this.ConnectedRouter>{props.children}</this.ConnectedRouter>;
  }
}

export { ReactRouter as Router, RouterOptions };
