/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-loop-func */
import { produce, setAutoFreeze } from 'immer';
import { FunctionComponent } from 'react';
import { Container, ModuleOptions, ServiceIdentifiersMap } from 'reactant-di';
import {
  applyMiddleware,
  combineReducers,
  createStore as createStoreWithRedux,
  PreloadedState,
  ReducersMapObject,
  Store,
} from 'redux';

import {
  stagedStateKey,
  stateKey,
  storeKey,
  subscriptionsKey,
} from '../constants';
import {
  DevOptions,
  PluginHooks,
  ReactantAction,
  Subscriptions,
  ThisService,
} from '../interfaces';
import { getComposeEnhancers, getStageName, perform } from '../utils';
import { handlePlugin } from './handlePlugin';

export function createStore<T = any>(
  modules: ModuleOptions[],
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  preloadedState?: PreloadedState<T>,
  providers: FunctionComponent[] = [],
  devOptions: DevOptions = {}
) {
  const enableAutoFreeze =
    devOptions.autoFreeze ?? process.env.NODE_ENV !== 'production';
  const enableReduxDevTools =
    devOptions.reduxDevTools ?? process.env.NODE_ENV !== 'production';
  setAutoFreeze(enableAutoFreeze);
  let isExistReducer = false;
  let store: Store;
  const reducers: ReducersMapObject = {};
  const pluginHooks: PluginHooks = {
    middleware: [],
    beforeCombineRootReducers: [],
    afterCombineRootReducers: [],
    enhancer: [],
    preloadedStateHandler: [],
    afterCreateStore: [],
    provider: providers,
  };
  const subscriptions: Subscriptions = [];
  // add Non-dependent `modules` to ServiceIdentifiers config.
  for (const module of modules) {
    const moduleIdentifier =
      typeof module === 'function' ? module : module.provide;
    if (!ServiceIdentifiers.has(moduleIdentifier)) {
      ServiceIdentifiers.set(moduleIdentifier, []);
    }
  }

  for (const [Service] of ServiceIdentifiers) {
    // `Service` should be bound before `createStore`.
    if (container.isBound(Service)) {
      const services = container.getAll(Service);
      services.forEach((service, index) => {
        handlePlugin(service, pluginHooks);
        const isPlainObject =
          toString.call(service[stateKey]) === '[object Object]';
        if (isPlainObject) {
          const className = (Service as Function).name;
          let reducersIdentifier: string = service.name;
          // string identifier is defined primarily.
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
          const isEmptyObject = Object.keys(service[stateKey]).length === 0;
          if (!isEmptyObject) {
            const descriptors: Record<string, PropertyDescriptor> = {};
            for (const key in service[stateKey]) {
              const descriptor = Object.getOwnPropertyDescriptor(service, key);
              if (typeof descriptor === 'undefined') break;
              Object.assign(service[stateKey], {
                [key]: descriptor.value,
              });
              descriptors[key] = {
                enumerable: true,
                configurable: false,
                get(this: ThisService) {
                  return this[stateKey]![key];
                },
                set(this: ThisService, value: any) {
                  this[stateKey]![key] = value;
                },
              };
            }

            const initState = enableAutoFreeze
              ? produce({ ...service[stateKey] }, () => {}) // freeze init state
              : service[stateKey];
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
            Object.defineProperties(service, descriptors);
            // redefine get service state from store state.
            Object.defineProperties(service, {
              [stateKey]: {
                enumerable: false,
                configurable: false,
                get() {
                  if (this[stagedStateKey]) return this[stagedStateKey];
                  const currentState = store.getState()[reducersIdentifier];
                  if (enableAutoFreeze && !Object.isFrozen(currentState)) {
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
  const composeEnhancers = getComposeEnhancers(
    enableReduxDevTools,
    devOptions.reduxDevToolsOptions
  );
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
