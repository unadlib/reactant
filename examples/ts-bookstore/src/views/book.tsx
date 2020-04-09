import React from 'react';
import {
  render,
  BrowserRouter,
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  inject,
  optional,
  useConnector,
  defaultProps,
  action,
  createSelector,
  state,
} from 'reactant';

@injectable()
class BookView extends ViewModule {
  constructor() {
    super();
  }

  path = '/book/:id';

  component() {
    return null;
  }
}

export { BookView };
