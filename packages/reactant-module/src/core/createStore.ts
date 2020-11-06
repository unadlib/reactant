/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-loop-func */
import {
  setAutoFreeze,
  produce,
  enablePatches as enablePatchesWithImmer,
} from 'immer';
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
  enablePatchesKey,
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
): ReactantStore {
  let isExistReducer = false;
  let store: ReactantStore | undefined = originalStore;
  let reducers: ReducersMapObject = {};
  const identifiers = new Set<string>();
  const subscriptions: Subscriptions = [];

  const enableAutoFreeze = devOptions.autoFreeze ?? __DEV__;
  const enableReduxDevTools = devOptions.reduxDevTools ?? __DEV__;
  const enablePatches = devOptions.enablePatches ?? false;
  if (typeof store === 'undefined') {
    setAutoFreeze(enableAutoFreeze);
    if (enablePatches) {
      enablePatchesWithImmer();
    }
  }

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

        // eslint-disable-next-line @typescript-eslint/ban-types
        const className = (Service as Function).name;
        let identifier: string = service.name;
        // string identifier is defined primarily.
        if (typeof Service === 'string') {
          identifier = Service;
        }
        // `service.name` is to be defined and define stage name, but persist or merge state should be defined.
        // this solution replaces the `combineReducers` need `Object.keys` get keys without `symbol` keys.
        identifier ??= getStageName(className);
        if (typeof identifier !== 'string') {
          if (__DEV__) {
            console.error(`
                Since '${className}' module has set the module state, '${className}' module must set a unique and valid class property 'name' to be used as the module index.
                Example:
                  class FooBar {
                    name = 'FooBar'; // <- add the 'name' property.
                  }
              `);
          } else {
            throw new Error(
              `'${className}' module 'name' property should be defined as a valid 'string'.`
            );
          }
        }
        if (identifiers.has(identifier)) {
          if (services.length === 1) {
            throw new Error(
              `'${className}' module name '${identifier}' property and other module conflicts.`
            );
          } else {
            // injection about multi-instances
            identifier += `${index}`;
          }
        }
        identifiers.add(identifier);
        if (isPlainObject) {
          const isEmptyObject = Object.keys(service[stateKey]).length === 0;
          if (!isEmptyObject) {
            const descriptors: Record<string, PropertyDescriptor> = {};
            for (const key in service[stateKey]) {
              const descriptor = Object.getOwnPropertyDescriptor(service, key);
              // eslint-disable-next-line no-continue
              if (typeof descriptor === 'undefined') continue;
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
                  return action._reactant === actionIdentifier
                    ? action.state[identifier][key]
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
              [identifier]: reducer,
            });
            Object.defineProperties(service, descriptors);
            // redefine get service state from store state.
            Object.defineProperties(service, {
              [stateKey]: {
                enumerable: false,
                configurable: false,
                get() {
                  const stagedState = getStagedState();
                  if (stagedState) return stagedState[identifier];

                  const currentState = store!.getState()[identifier];
                  if (enableAutoFreeze && !Object.isFrozen(currentState)) {
                    return Object.freeze(currentState);
                  }
                  return currentState;
                },
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
          // TODO: consider using `identifierKey` symbol.
          name: {
            enumerable: false,
            configurable: false,
            writable: false,
            value: identifier,
          },
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
          // enablePatches options for immer
          [enablePatchesKey]: {
            enumerable: false,
            configurable: false,
            value: enablePatches,
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
