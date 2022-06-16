/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-loop-func */
import {
  enablePatches as enablePatchesWithImmer,
  produce,
  setAutoFreeze,
} from 'immer';
import type {
  Container,
  ModuleOptions,
  ServiceIdentifiersMap,
} from 'reactant-di';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore as createStoreWithRedux,
  PreloadedState,
  Reducer,
  ReducersMapObject,
} from 'redux';

import {
  actionIdentifier,
  containerKey,
  enablePatchesKey,
  identifierKey,
  loaderKey,
  modulesKey,
  nameKey,
  stateKey,
  storeKey,
  subscriptionsKey,
} from '../constants';
import { getStagedState } from '../decorators';
import {
  DevOptions,
  Loader,
  ModulesMap,
  PluginHooks,
  ReactantAction,
  ReactantStore,
  Service as IService,
  Subscriptions,
  ThisService,
} from '../interfaces';
import { getComposeEnhancers, getStageName, perform } from '../utils';
import { handlePlugin } from './handlePlugin';

interface CreateStoreOptions<T> {
  modules: ModuleOptions[];
  container: Container;
  ServiceIdentifiers: ServiceIdentifiersMap;
  loadedModules: Set<any>;
  load: (...args: Parameters<Loader>) => void;
  pluginHooks: PluginHooks;
  preloadedState?: PreloadedState<T>;
  devOptions?: DevOptions;
  originalStore?: ReactantStore;
  beforeReplaceReducer?: () => void;
  modulesMap?: ModulesMap;
}

export function createStore<T = any>({
  modules,
  container,
  ServiceIdentifiers,
  loadedModules,
  load,
  pluginHooks,
  preloadedState,
  devOptions = {},
  originalStore,
  beforeReplaceReducer,
  modulesMap = {},
}: CreateStoreOptions<T>): ReactantStore {
  let isExistReducer = false;
  let store: ReactantStore | undefined = originalStore;
  let reducers: ReducersMapObject = {};
  const subscriptions: Subscriptions = [];
  // TODO: replace with `mutative`
  const enableAutoFreeze = devOptions.autoFreeze ?? true;
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
  for (const [ServiceIdentifier] of ServiceIdentifiers) {
    // `Service` should be bound before `createStore`.
    if (
      container.isBound(ServiceIdentifier) &&
      !loadedModules.has(ServiceIdentifier)
    ) {
      const services: IService[] = container.getAll(ServiceIdentifier);
      loadedModules.add(ServiceIdentifier);
      services.forEach((service, index) => {
        if (typeof service !== 'object' || service === null) {
          return;
        }
        handlePlugin(service, pluginHooks);
        const isPlainObject =
          toString.call(service[stateKey]) === '[object Object]';
        const className = (ServiceIdentifier as Function).name;
        let identifier: string | undefined = service[nameKey];
        // The `options.name` property of the decorator `@injectable(options)` parameter must be specified as a string, otherwise a staged string will be generated.
        // this solution replaces the `combineReducers` need `Object.keys` get keys without `symbol` keys.
        identifier ??= getStageName(className ?? String(ServiceIdentifier));
        if (typeof identifier !== 'string') {
          if (__DEV__) {
            console.error(`
                Since '${className}' module has set the module state, '${className}' module must set a unique and valid class property 'nameKey' to be used as the module index.
                Example:
                  @injectable({ name: 'fooBar' }) // <- add identifier for modules.
                  class FooBar {}
              `);
          } else {
            throw new Error(
              `'${className}' module 'options.name' property in '@injectable(options)' should be defined as a valid 'string'.`
            );
          }
        }
        if (services.length > 1) {
          // injection about multi-instances
          identifier += `:${index}`;
        }
        if (modulesMap[identifier]) {
          throw new Error(
            `Unexpected multiple instances, provider: '${
              className ?? ServiceIdentifier
            }' module '${identifier}' property and other module conflicts. Please check the token for dependency injection.`
          );
        }
        Object.assign(modulesMap, {
          [identifier]: service,
        });
        if (isPlainObject) {
          const isEmptyObject = Object.keys(service[stateKey]!).length === 0;
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
              : service[stateKey]!;
            const serviceReducers = Object.keys(initState).reduce(
              (serviceReducersMapObject: ReducersMapObject, key) => {
                const value = initState[key];
                // support pure reducer
                if (typeof value === 'function') {
                  const pureReducer: Reducer = value;
                  const _initState = pureReducer(undefined, {} as AnyAction);
                  const reducer = (
                    state = _initState,
                    action: ReactantAction
                  ) => {
                    return action._reactant === actionIdentifier &&
                      action.state[identifier!]
                      ? action.state[identifier!][key]
                      : pureReducer(state, action);
                  };
                  return Object.assign(serviceReducersMapObject, {
                    [key]: reducer,
                  });
                }
                const reducer = (state = value, action: ReactantAction) => {
                  return action._reactant === actionIdentifier &&
                    action.state[identifier!]
                    ? action.state[identifier!][key]
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
                  if (stagedState) return stagedState[identifier!];

                  const currentState = store!.getState()[identifier!];
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
          subscriptions.push(...service[subscriptionsKey]!);
        }
        Object.defineProperties(service, {
          [modulesKey]: {
            enumerable: false,
            configurable: false,
            writable: false,
            value: modulesMap,
          },
          [identifierKey]: {
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
          [containerKey]: {
            enumerable: false,
            configurable: false,
            get() {
              return container;
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
      perform(
        pluginHooks.preloadedStateHandler,
        preloadedState
          ? Object.entries(preloadedState).reduce<Record<string, any>>(
              (state, [key, value]) =>
                modulesMap[key]
                  ? Object.assign(state, {
                      [key]: value,
                    })
                  : state,
              {}
            )
          : preloadedState
      ),
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
  } else if (typeof beforeReplaceReducer === 'function') {
    // TODO: refactor hook
    beforeReplaceReducer();
  }
  perform(subscriptions);
  return store;
}
