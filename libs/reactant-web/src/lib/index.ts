/* eslint-disable camelcase */
import * as ReactDom from 'react-dom';
import type { Renderer } from 'react-dom';

export * from 'reactant-router-dom';

const {
  findDOMNode,
  unmountComponentAtNode,
  createPortal,
  version,
  render,
  hydrate,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
} = ReactDom;

export {
  findDOMNode,
  unmountComponentAtNode,
  createPortal,
  version,
  render,
  hydrate,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
};

export type { Renderer };
