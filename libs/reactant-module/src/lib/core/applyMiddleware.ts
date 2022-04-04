import {
  applyMiddleware as applyMiddlewareWithRedux,
  Middleware,
  Store,
} from 'redux';
import { PluginModule } from './plugin';
import { storeKey } from '../constants';

/**
 * ## Description
 * Apply middlewares for Redux.
 *
 * ## Example
 *
 * ```ts
 * import logger from 'redux-logger';
 *
 * @injectable()
 * class Foo {}
 *
 * const app = createApp({
 *   modules: [applyMiddleware(logger)],
 *   main: Foo,
 *   render: () => {},
 * });
 * ```
 *
 * @param args middlewares for Redux
 */
const applyMiddleware = (...args: Middleware[]) => {
  return class extends PluginModule {
    readonly [storeKey]?: Store;

    // eslint-disable-next-line prefer-spread
    override enhancer = applyMiddlewareWithRedux.apply(null, args);
  };
};

export { applyMiddleware };
