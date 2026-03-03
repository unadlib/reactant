/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import type { ReactNode } from 'react';
import * as ReactDom from 'react-dom';

export type { Renderer } from 'react-dom';

export {
  BrowserRouter,
  MemoryRouter,
  Switch,
  Route,
  NavLink,
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

type LegacyRender = typeof ReactDom.render;
type LegacyHydrate = typeof ReactDom.hydrate;
type LegacyUnmountComponentAtNode = typeof ReactDom.unmountComponentAtNode;

type RootContainer = Element | Document | DocumentFragment;
type RootNode = {
  render(children: ReactNode): void;
  unmount(): void;
};
type ReactDomClient = {
  createRoot?: (container: Element | DocumentFragment) => RootNode;
  hydrateRoot?: (container: Element | Document, children: ReactNode) => RootNode;
};

const roots = new Map<RootContainer, RootNode>();

let createConcurrentRoot: ReactDomClient['createRoot'];
let hydrateConcurrentRoot: ReactDomClient['hydrateRoot'];
try {
  const reactDomClient = require('react-dom/client') as ReactDomClient;
  createConcurrentRoot = reactDomClient.createRoot;
  hydrateConcurrentRoot = reactDomClient.hydrateRoot;
} catch {
  createConcurrentRoot = undefined;
  hydrateConcurrentRoot = undefined;
}

const invokeCallback = (callback?: () => void) => {
  if (typeof callback === 'function') {
    callback();
  }
};

const renderWithCallback = (renderAction: () => void, callback?: () => void) => {
  if (typeof ReactDom.flushSync === 'function') {
    ReactDom.flushSync(() => {
      renderAction();
    });
    invokeCallback(callback);
    return;
  }
  renderAction();
  invokeCallback(callback);
};

export const createRoot = (container: Element | DocumentFragment) => {
  if (!createConcurrentRoot) {
    throw new Error(`'createRoot' requires react-dom@18 or above.`);
  }
  const root = createConcurrentRoot(container);
  roots.set(container, root);
  return root;
};

export const hydrateRoot = (container: Element | Document, children: ReactNode) => {
  if (!hydrateConcurrentRoot) {
    throw new Error(`'hydrateRoot' requires react-dom@18 or above.`);
  }
  const root = hydrateConcurrentRoot(container, children);
  roots.set(container, root);
  return root;
};

export const render: LegacyRender = ((element, container, callback) => {
  if (!createConcurrentRoot || !container) {
    return ReactDom.render(element, container, callback);
  }
  const rootContainer = container as RootContainer;
  const root =
    roots.get(rootContainer) ??
    createConcurrentRoot(container as Element | DocumentFragment);
  roots.set(rootContainer, root);
  renderWithCallback(() => {
    root.render(element as ReactNode);
  }, callback);
  return null;
}) as LegacyRender;

export const hydrate: LegacyHydrate = ((element, container, callback) => {
  if (!hydrateConcurrentRoot || !container) {
    return ReactDom.hydrate(element, container, callback);
  }
  const rootContainer = container as RootContainer;
  const root = roots.get(rootContainer);
  if (root) {
    renderWithCallback(() => {
      root.render(element as ReactNode);
    }, callback);
    return null;
  }
  let hydratedRoot: RootNode | undefined;
  renderWithCallback(() => {
    hydratedRoot = hydrateConcurrentRoot(
      container as Element | Document,
      element as ReactNode
    );
  }, callback);
  if (!hydratedRoot) {
    return null;
  }
  roots.set(rootContainer, hydratedRoot);
  return null;
}) as LegacyHydrate;

export const unmountComponentAtNode: LegacyUnmountComponentAtNode = (
  (container) => {
    const root = roots.get(container as RootContainer);
    if (root) {
      root.unmount();
      roots.delete(container as RootContainer);
      return true;
    }
    if (createConcurrentRoot) {
      return false;
    }
    return ReactDom.unmountComponentAtNode(container);
  }
) as LegacyUnmountComponentAtNode;

export const {
  findDOMNode,
  createPortal,
  version,
  flushSync,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
} = ReactDom;
