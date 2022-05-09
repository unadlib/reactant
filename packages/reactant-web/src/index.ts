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
  RedirectProps,
  Redirect,
  RouteChildrenProps,
  RouteComponentProps,
  RouteProps,
  Router,
  StaticRouter,
  SwitchProps,
  match,
  matchPath,
  withRouter,
  RouterChildContext,
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
