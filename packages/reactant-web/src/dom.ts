/* eslint-disable camelcase */
import type { ReactNode } from 'react';
import * as ReactDom from 'react-dom';

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
type ReactDomInternals = {
  usingClientEntryPoint?: boolean;
};

const roots = new Map<RootContainer, RootNode>();

const reactDomClient = ReactDom as typeof ReactDom & ReactDomClient;
const createConcurrentRoot = reactDomClient.createRoot;
const hydrateConcurrentRoot = reactDomClient.hydrateRoot;
const reactDomInternals = (
  ReactDom as typeof ReactDom & {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: ReactDomInternals;
  }
).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

const invokeClientEntryPoint = <T>(callback: () => T): T => {
  if (!reactDomInternals || typeof reactDomInternals.usingClientEntryPoint !== 'boolean') {
    return callback();
  }
  reactDomInternals.usingClientEntryPoint = true;
  try {
    return callback();
  } finally {
    reactDomInternals.usingClientEntryPoint = false;
  }
};

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
  const root = invokeClientEntryPoint(() => createConcurrentRoot(container));
  roots.set(container, root);
  return root;
};

export const hydrateRoot = (container: Element | Document, children: ReactNode) => {
  if (!hydrateConcurrentRoot) {
    throw new Error(`'hydrateRoot' requires react-dom@18 or above.`);
  }
  const root = invokeClientEntryPoint(() =>
    hydrateConcurrentRoot(container, children)
  );
  roots.set(container, root);
  return root;
};

export const render: LegacyRender = ((
  element: Parameters<LegacyRender>[0],
  container: Parameters<LegacyRender>[1],
  callback: Parameters<LegacyRender>[2]
) => {
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

export const hydrate: LegacyHydrate = ((
  element: Parameters<LegacyHydrate>[0],
  container: Parameters<LegacyHydrate>[1],
  callback: Parameters<LegacyHydrate>[2]
) => {
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
    hydratedRoot = invokeClientEntryPoint(() =>
      hydrateConcurrentRoot(container as Element | Document, element as ReactNode)
    );
  }, callback);
  if (!hydratedRoot) {
    return null;
  }
  roots.set(rootContainer, hydratedRoot);
  return null;
}) as LegacyHydrate;

export const unmountComponentAtNode: LegacyUnmountComponentAtNode = (
  (container: Parameters<LegacyUnmountComponentAtNode>[0]) => {
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
