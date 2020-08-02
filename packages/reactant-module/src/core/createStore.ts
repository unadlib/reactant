/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-loop-func */
import { setAutoFreeze, produce } from 'immer';
import {
  combineReducers,
  ReducersMapObject,
  createStore as createStoreWithRedux,
  PreloadedState,
  applyMiddleware,
} from 'redux';
import { Container, ServiceIdentifiersMap, ModuleOptions } from 'reactant-di';
import {
  ReactantAction,
  PluginHooks,
  DevOptions,
  Subscriptions,
  ThisService,
  ReactantStore,
  Loader,
} from '../interfaces';
import {
  storeKey,
  subscriptionsKey,
  stateKey,
  actionIdentifier,
  loaderKey,
  computedKey,
} from '../constants';
import { getStageName, perform, getComposeEnhancers } from '../utils';
import { handlePlugin } from './handlePlugin';
import { getStagedState } from '../decorators';

// TODO: refactor
export function createStore<T = any>(
  modules: ModuleOptions[],
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  loadedModules: Set<any>,
  load: (...args: Parameters<Loader>) => void,
  pluginHooks: PluginHooks,
  // optional
  preloadedState?: PreloadedState<T>,
  devOptions: DevOptions = {},
  originalStore?: ReactantStore,
  beforeReplaceReducer?: () => void
) {
  const enableAutoFreeze =
    devOptions.autoFreeze ?? process.env.NODE_ENV !== 'production';
  const enableReduxDevTools =
    devOptions.reduxDevTools ?? process.env.NODE_ENV !== 'production';
  setAutoFreeze(enableAutoFreeze);

  let isExistReducer = false;
  let store: ReactantStore | undefined = originalStore;
  let reducers: ReducersMapObject = {};
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
    if (container.isBound(Service) && !loadedModules.has(Service)) {
      const services = container.getAll(Service);
      loadedModules.add(Service);
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
                set(this: ThisService, value: unknown) {
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
                  return action._reactant === actionIdentifier &&
                    action.lastState[reducersIdentifier] !==
                      action.state[reducersIdentifier]
                    ? action.state[reducersIdentifier][key]
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
                  const stagedState = getStagedState();
                  if (stagedState) return stagedState[reducersIdentifier];

                  const currentState = store!.getState()[reducersIdentifier];
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
        let wrappedComputedDescriptors = {};
        if (typeof service[computedKey] === 'object') {
          wrappedComputedDescriptors = Object.entries<
            () => TypedPropertyDescriptor<any>
          >(service[computedKey]).reduce<
            Record<string, TypedPropertyDescriptor<any>>
          >(
            (descriptors, [key, getDescriptor]) =>
              Object.assign(descriptors, {
                [key]: getDescriptor(),
              }),
            wrappedComputedDescriptors
          );
        }
        Object.defineProperties(service, {
          ...wrappedComputedDescriptors,
          // in order to support multiple instances for stores.
          [storeKey]: {
            enumerable: false,
            configurable: false,
            get() {
              return store;
            },
          },
          // loader for dynamic modules.
          [loaderKey]: {
            enumerable: false,
            configurable: false,
            value(...args: Parameters<Loader>) {
              load(...args);
            },
          },
        });
      });
    }
  }
  if (typeof store === 'undefined') {
    // load reducers and create store for Redux
    const reducer = isExistReducer
      ? combineReducers(
          (reducers = perform(pluginHooks.beforeCombineRootReducers, reducers))
        )
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
    if (isExistReducer) {
      Object.assign(store, {
        reducers,
      });
    }
    perform(pluginHooks.afterCreateStore, store);
  } else if (isExistReducer) {
    // just load reducers
    store.reducers = {
      ...store.reducers,
      ...perform(pluginHooks.beforeCombineRootReducers, reducers),
    };
    const reducer = combineReducers(store.reducers!);
    const rootReducer = perform(pluginHooks.afterCombineRootReducers, reducer);
    if (typeof beforeReplaceReducer === 'function') {
      beforeReplaceReducer();
    }
    store.replaceReducer(rootReducer);
  }
  perform(subscriptions);
  return store;
}
