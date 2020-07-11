import { applyMiddleware, Middleware, Store } from 'redux';
import { PluginModule } from './plugin';
import { storeKey } from '../constants';

/**
 * Compose and spawn middlewares for Redux.
 *
 * **Example:**
 *
 * ```ts
 * import logger from 'redux-logger';
 *
 * @injectable()
 * class Foo {}
 *
 * const app = createApp({
 *   modules: [spawnMiddlewares(logger)],
 *   main: Foo,
 *   render: () => {},
 * });
 * ```
 *
 * @param args middlewares for Redux
 */
const spawnMiddlewares = (...args: Middleware[]) => {
  return class extends PluginModule {
    readonly [storeKey]?: Store;

    // eslint-disable-next-line prefer-spread
    enhancer = applyMiddleware.apply(null, args);
  };
};

export { spawnMiddlewares };
