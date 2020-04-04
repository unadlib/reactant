/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-loop-func */
import { FunctionComponent } from 'react';
import { setAutoFreeze, produce } from 'immer';
import {
  combineReducers,
  ReducersMapObject,
  createStore as createStoreWithRedux,
  Store,
  PreloadedState,
  applyMiddleware,
} from 'redux';
import { Container, ServiceIdentifiersMap } from 'reactant-di';
import {
  ReactantMiddleware,
  ReactantAction,
  PluginHooks,
  DevOptions,
  Subscriptions,
} from '../interfaces';
import { storeKey, subscriptionsKey, stagedStateKey } from '../constants';
import { getStageName, perform, getComposeEnhancers } from '../utils';
import { handlePlugin } from './handlePlugin';

export function createStore<T = any>(
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  preloadedState?: PreloadedState<T>,
  middlewares: ReactantMiddleware[] = [],
  providers: FunctionComponent[] = [],
  devOptions: DevOptions = {}
) {
  const autoFreeze =
    devOptions.autoFreeze ?? process.env.NODE_ENV !== 'production';
  const reduxDevTools =
    devOptions.reduxDevTools ?? process.env.NODE_ENV !== 'production';
  setAutoFreeze(autoFreeze);
  let isExistReducer = false;
  let store: Store;
  const reducers: ReducersMapObject = {};
  const pluginHooks: PluginHooks = {
    middleware: middlewares,
    beforeCombineRootReducers: [],
    afterCombineRootReducers: [],
    enhancer: [],
    preloadedStateHandler: [],
    afterCreateStore: [],
    provider: providers,
  };
  const subscriptions: Subscriptions = [];
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
          let reducersIdentifier: string = service.name;
          // string token is defined primarily.
          if (typeof Service === 'string') {
            reducersIdentifier = Service;
          }
          if (
            typeof reducersIdentifier === 'undefined' ||
            reducersIdentifier === null
          ) {
            // `service.name` is to be defined and define stage name, but persist or merge state should be defined.
            // this solution replaces the `combineReducers` need `Object.keys` get keys without `symbol` keys.
            reducersIdentifier = getStageName(className);
          }
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
                `'${className}' module name '${reducersIdentifier}' property and other module conflicts.`
              );
            } else {
              // injection about multi-instances
              reducersIdentifier = `${reducersIdentifier}${index}`;
            }
          }
          const isEmptyObject = Object.keys(service.state).length === 0;
          if (!isEmptyObject) {
            const initState = autoFreeze
              ? produce(service.state, () => {}) // freeze init state
              : service.state;
            const serviceReducers = Object.entries(initState).reduce(
              (serviceReducersMapObject: ReducersMapObject, [key, value]) => {
                // support pure reducer
                if (typeof value === 'function') {
                  return Object.assign(serviceReducersMapObject, {
                    [key]: value,
                  });
                }
                const reducer = (state = value, action: ReactantAction) => {
                  return action.type === reducersIdentifier
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
                  if (this[stagedStateKey]) return this[stagedStateKey];
                  const currentState = store.getState()[reducersIdentifier];
                  if (autoFreeze && !Object.isFrozen(currentState)) {
                    return Object.freeze(currentState);
                  }
                  return currentState;
                },
              },
              name: {
                enumerable: false,
                configurable: false,
                value: reducersIdentifier,
              },
            });
          } else {
            throw new Error(`
            '${className}' class property 'state' must have at least one state key.
          `);
          }
        }
        if (Array.isArray(service[subscriptionsKey])) {
          subscriptions.push(...service[subscriptionsKey]);
        }
        Object.defineProperties(service, {
          // in order to support multiple instances for stores.
          [storeKey]: {
            enumerable: false,
            configurable: false,
            get() {
              return store;
            },
          },
        });
      });
    }
  }
  const reducer = isExistReducer
    ? combineReducers(perform(pluginHooks.beforeCombineRootReducers, reducers))
    : () => null;
  const composeEnhancers = getComposeEnhancers(reduxDevTools);
  store = createStoreWithRedux(
    perform(pluginHooks.afterCombineRootReducers, reducer),
    perform(pluginHooks.preloadedStateHandler, preloadedState),
    composeEnhancers(
      applyMiddleware(...pluginHooks.middleware),
      ...pluginHooks.enhancer
    )
  );
  perform(pluginHooks.afterCreateStore, store);
  perform(subscriptions);
  return store;
}
