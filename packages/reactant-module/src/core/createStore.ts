/* eslint-disable no-loop-func */
import {
  combineReducers,
  ReducersMapObject,
  createStore as createStoreWithRedux,
  Store,
  PreloadedState,
  applyMiddleware,
  compose,
} from 'redux';
import { Container, ServiceIdentifiersMap } from 'reactant-di';
import { ReactantMiddleware, ReactantAction, PluginHooks } from '../interfaces';
import { storeKey, actionIdentifierKey } from '../constants';
import { getStageName, perform } from '../utils';
import { handlePlugin } from './handlePlugin';

export function createStore<T = any>(
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  preloadedState?: PreloadedState<T>,
  middlewares: ReactantMiddleware[] = [],
  providers: any[] = [] // todo type
) {
  let isExistReducer = false;
  let store: Store;
  const reducers: ReducersMapObject = {};
  const pluginHooks: PluginHooks = {
    middleware: middlewares,
    beforeCombineRootReducers: [],
    afterCombineRootReducers: [],
    enhancer: [],
    preloadedStateHandler: [],
    provider: providers,
  };
  for (const [Service] of ServiceIdentifiers) {
    // `Service` should be bound before `createStore`.
    if (container.isBound(Service)) {
      const services = container.getAll(Service);
      services.forEach((service, index) => {
        handlePlugin(service, pluginHooks);
        const isPlainObject =
          toString.call(service.state) === '[object Object]';
        if (isPlainObject) {
          const className = (Service as Function).name;
          if (typeof service.name === 'undefined' || service.name === null) {
            // `service.name` is to be defined and define stage name, but persist or merge state should be defined.
            // this solution replaces the `combineReducers` need `Object.keys` get keys without `symbol` keys.
            const stageName = getStageName(className);
            Object.assign(service, {
              name: stageName,
            });
          }
          let reducersIdentifier: string | symbol = service.name;
          const actionIdentifier =
            typeof reducersIdentifier === 'symbol'
              ? reducersIdentifier
              : Symbol('state');
          if (typeof reducersIdentifier !== 'string' || !reducersIdentifier) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(`
                Since '${className}' module has set the module state, '${className}' module must set a unique and valid class property 'name' to be used as the module index.
                Example:
                  class FooBar {
                    name = 'FooBar'; // <- add the 'name' property.

                    state = { foo: 'bar' };
                  }
              `);
            }
            throw new Error(
              `'${className}' module 'name' property should be defined as a valid 'string'.`
            );
          }
          if (typeof reducers[reducersIdentifier] === 'function') {
            if (services.length === 1) {
              throw new Error(
                `'${className}' module 'name'('${reducersIdentifier}') property and other module conflicts.`
              );
            } else {
              // injection about multi-instances
              reducersIdentifier = `${reducersIdentifier}${index}`;
            }
          }
          const isEmptyObject = Object.keys(service.state).length === 0;
          if (!isEmptyObject) {
            const serviceReducers = Object.entries(service.state).reduce(
              (serviceReducersMapObject: ReducersMapObject, [key, value]) => {
                // support pure reducer
                if (typeof value === 'function') {
                  return Object.assign(serviceReducersMapObject, {
                    [key]: value,
                  });
                }
                const reducer = (state = value, action: ReactantAction) => {
                  return action.type === actionIdentifier
                    ? action.state[key]
                    : state;
                };
                return Object.assign(serviceReducersMapObject, {
                  [key]: reducer,
                });
              },
              {}
            );
            isExistReducer = true;
            const reducer = combineReducers(serviceReducers);
            Object.assign(reducers, {
              [reducersIdentifier]: reducer,
            });
            // redefine get service state from store state.
            Object.defineProperties(service, {
              state: {
                enumerable: true,
                configurable: false,
                get() {
                  return store.getState()[reducersIdentifier];
                },
              },
              [actionIdentifierKey]: {
                enumerable: false,
                configurable: false,
                value: actionIdentifier,
              },
              // in order to support multiple instances for stores.
              [storeKey]: {
                enumerable: false,
                configurable: false,
                get() {
                  return store;
                },
              },
            });
          } else {
            throw new Error(`
            '${className}' class property 'state' must have at least one state key.
          `);
          }
        }
      });
    }
  }
  const reducer = isExistReducer
    ? combineReducers(perform(pluginHooks.beforeCombineRootReducers, reducers))
    : () => null;
  store = createStoreWithRedux(
    perform(pluginHooks.afterCombineRootReducers, reducer),
    perform(pluginHooks.preloadedStateHandler, preloadedState),
    compose(applyMiddleware(...pluginHooks.middleware), ...pluginHooks.enhancer)
  );
  return store;
}
