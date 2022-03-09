/* eslint-disable camelcase */
import type { ReactChild } from 'react';
import type { Root, createRoot } from 'react-dom';
// todo: fix types for `react-dom/client`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ReactDOM from 'react-dom/client';

export * from 'reactant-router-dom';

export {
  createRoot,
  findDOMNode,
  hydrate,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer,
  version,
  unstable_batchedUpdates,
  flushSync,
  createPortal,
} from 'react-dom';

export type {
  Container,
  HydrationOptions,
  Renderer,
  Root,
  RootOptions,
} from 'react-dom';

export const render = (
  children: ReactChild,
  container: Parameters<typeof createRoot>[0],
  options: Parameters<typeof createRoot>[1]
) => {
  const root: Root = ReactDOM.createRoot(container, options);
  root.render(children);
  return () => root.unmount();
};
