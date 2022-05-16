/* eslint-disable camelcase */
import * as ReactDom from 'react-dom';

export type { Renderer } from 'react-dom';

export {
  BrowserRouter,
  MemoryRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
  generatePath,
  Prompt,
  Redirect,
  Router,
  StaticRouter,
  matchPath,
  withRouter,
} from 'reactant-router-dom';

export type {
  RedirectProps,
  RouteChildrenProps,
  RouteComponentProps,
  SwitchProps,
  match,
  RouterChildContext,
  RouteProps,
} from 'reactant-router-dom';

export const {
  findDOMNode,
  unmountComponentAtNode,
  createPortal,
  version,
  render,
  hydrate,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
} = ReactDom;
