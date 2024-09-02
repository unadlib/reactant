/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-loop-func */
import { create } from 'mutative';
import {
  Container,
  getMetadata,
  METADATA_KEY,
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
  defaultStateKey,
  enablePatchesKey,
  enableAutoFreezeKey,
  identifierKey,
  loaderKey,
  modulesKey,
  nameKey,
  stateKey,
  storeKey,
  initStateKey,
  subscriptionsKey,
  enableInspectorKey,
  dynamicModulesKey,
  strictKey,
  enableAutoComputedKey,
  signalMapKey,
} from '../constants';
import { getStagedState } from '../decorators';
import type {
  DevOptions,
  DynamicModules,
  Loader,
  ModulesMap,
  PluginHooks,
  ReactantAction,
  ReactantStore,
  Service as IService,
  Subscriptions,
  ThisService,
} from '../interfaces';
import { getComposeEnhancers, getStageName, isEqual, perform } from '../utils';
import {
  assignPlugin,
  pushPlugin,
  mergePluginHooks,
  generatePluginHooks,
} from './handlePlugin';
import { type Signal, signal } from './signal';

interface CreateStoreOptions<T> {
  modules: ModuleOptions[];
  container: Container;
  ServiceIdentifiers: ServiceIdentifiersMap;
  loadedModules: Set<any>;
  load: (...args: Parameters<Loader>) => void;
  dynamicModules: DynamicModules;
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
  dynamicModules,
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
  const subscriptions: Subscriptions[] = [];
  const enableAutoFreeze = devOptions.autoFreeze ?? false;
  const enableAutoComputed = devOptions.autoComputed ?? false;
  const enableReduxDevTools = devOptions.reduxDevTools ?? __DEV__;
  const enablePatches = devOptions.enablePatches ?? false;
  const enableInspector = devOptions.enableInspector ?? false;
  const strict = devOptions.strict ?? false;

  const _pushPluginHooks = generatePluginHooks();
  const _assignPluginHooks = generatePluginHooks();

  dynamicModules.forEach((module, key) => {
    try {
      const services = container!.getAll(key);
      module.value = !module.multiple ? services[0] : services;
    } catch (e) {
      //
    }
  });

  // add Non-dependent `modules` to ServiceIdentifiers config.
  for (const module of modules) {
    const moduleIdentifier =
      typeof module === 'function' ? module : module.provide;
    if (!ServiceIdentifiers.has(moduleIdentifier)) {
      ServiceIdentifiers.set(moduleIdentifier, []);
    }
  }
  const multipleInjectMap = getMetadata(METADATA_KEY.multiple);
  // #region sort ServiceIdentifiers
  // it's just a workaround for the issue of `ServiceIdentifiers` order.
  // InversifyJS issue: https://github.com/inversify/InversifyJS/issues/1578
  const allServiceIdentifiers = Array.from(ServiceIdentifiers);
  const allServiceIdentifierKeys = Array.from(ServiceIdentifiers.keys());
  allServiceIdentifiers.sort(([a], [b]) => {
    let aDeps = [];
    try {
      aDeps = Reflect.getMetadata(METADATA_KEY.paramtypes, a) ?? [];
    } catch (e) {
      //
    }
    let bDeps = [];
    try {
      bDeps = Reflect.getMetadata(METADATA_KEY.paramtypes, b) ?? [];
    } catch (e) {
      //
    }
    return aDeps.length - bDeps.length;
  });
  ServiceIdentifiers.clear();
  // ServiceIdentifiers is sorted by the number of dependencies.
  // The purpose is to ensure that the module is loaded in the correct order.
  // The module with fewer dependencies is loaded first.
  // ServiceIdentifiers is a mutable object, so it needs to be redefined.
  allServiceIdentifiers.forEach(([ServiceIdentifier, value]) => {
    ServiceIdentifiers.set(ServiceIdentifier, value);
  });
  // #endregion
  for (const [ServiceIdentifier] of ServiceIdentifiers) {
    // `Service` should be bound before `createStore`.
    const isMultipleInjection = multipleInjectMap.has(ServiceIdentifier);
    const shouldInstantiate =
      container.isBound(ServiceIdentifier) &&
      (isMultipleInjection ||
        (!isMultipleInjection && !loadedModules.has(ServiceIdentifier)));
    if (shouldInstantiate) {
      const services: IService[] = container.getAll(ServiceIdentifier);
      loadedModules.add(ServiceIdentifier);
      services.forEach((service, index) => {
        const indexPlugin = allServiceIdentifierKeys.indexOf(ServiceIdentifier);
        if (indexPlugin === -1) {
          pushPlugin(service, _pushPluginHooks, indexPlugin);
        } else {
          assignPlugin(service, _assignPluginHooks, indexPlugin);
        }
        const className = (ServiceIdentifier as Function).name;
        let identifier: string | undefined =
          typeof ServiceIdentifier === 'string'
            ? ServiceIdentifier
            : service[nameKey];
        // module identifier prioritizes using DI module token
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
        if (
          typeof service !== 'object' ||
          service === null ||
          (service[modulesKey] && isMultipleInjection)
        ) {
          return;
        }
        const hasState = toString.call(service[stateKey]) === '[object Object]';
        if (hasState) {
          const signalMap: Record<string, Signal> = {};
          const isEmptyObject = Object.keys(service[stateKey]!).length === 0;
          if (!isEmptyObject) {
            const descriptors: Record<string, PropertyDescriptor> = {
              [signalMapKey]: {
                enumerable: false,
                configurable: false,
                writable: false,
                value: signalMap,
              },
            };
            for (const key in service[stateKey]) {
              const descriptor = Object.getOwnPropertyDescriptor(service, key);
              // eslint-disable-next-line no-continue
              if (typeof descriptor === 'undefined') continue;
              Object.assign(service[stateKey], {
                [key]: descriptor.value,
              });
              descriptors[key] = {
                enumerable: true,
                configurable: true,
                get(this: ThisService) {
                  const current = this[stateKey]![key];
                  if (!enableAutoComputed) return current;
                  const stagedState = getStagedState();
                  if (
                    !stagedState &&
                    signalMap[key] &&
                    !isEqual(signalMap[key].value, current)
                  ) {
                    try {
                      // Manual update signal value when the state is changed outside the common reducer.
                      signalMap[key].value = current;
                    } catch (e) {
                      if (
                        JSON.stringify(signalMap[key].value) !==
                        JSON.stringify(current)
                      ) {
                        console.error(
                          `[Reactant] The '${key}' state value of the module '${className}' has been changed outside the common reducer, which may cause the state to be out of sync. Please check middleware to update the state value without signal updating.`
                        );
                      }
                    }
                  }
                  return current;
                },
                set(this: ThisService, value: unknown) {
                  this[stateKey]![key] = value;
                },
              };
            }

            const initState = enableAutoFreeze
              ? create({ ...service[stateKey] }, () => {}, { enableAutoFreeze }) // freeze init state
              : service[stateKey]!;
            Object.assign(descriptors, {
              [initStateKey]: {
                enumerable: false,
                configurable: false,
                writable: false,
                value: initState,
              },
            });
            const serviceReducers = Object.keys(initState).reduce(
              (serviceReducersMapObject: ReducersMapObject, key) => {
                const value =
                  service[defaultStateKey] &&
                  // for custom reducer default state
                  Object.hasOwnProperty.call(service[defaultStateKey], key)
                    ? service[defaultStateKey]![key]
                    : initState[key];
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
                signalMap[key] = signal(value);
                const current = signalMap[key];
                const reducer = (state = value, action: ReactantAction) => {
                  if (
                    action._reactant === actionIdentifier &&
                    action.state[identifier!]
                  ) {
                    const nextState = action.state[identifier!][key];
                    if (enableAutoComputed && !isEqual(nextState, state)) {
                      current.value = nextState;
                    }
                    return nextState;
                  }
                  return state;
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
                  if (!store) return initState;
                  const currentState = store.getState()[identifier!];
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
        if (!Array.isArray(service[subscriptionsKey])) {
          // support any subscriptions with ref
          Object.assign(service, {
            [subscriptionsKey]: [],
          });
        }
        subscriptions.push(service[subscriptionsKey]!);
        try {
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
            // dynamic modules cache
            [dynamicModulesKey]: {
              enumerable: false,
              configurable: false,
              value: dynamicModules,
            },
            // loader for dynamic modules
            [loaderKey]: {
              enumerable: false,
              configurable: false,
              value(...args: Parameters<Loader>) {
                load(...args);
              },
            },
            // use strict mode for mutative
            [strictKey]: {
              enumerable: false,
              configurable: false,
              value: strict,
            },
            // enableAutoFreeze options for mutative
            [enableAutoFreezeKey]: {
              enumerable: false,
              configurable: false,
              value: enableAutoFreeze,
            },
            // enablePatches options for mutative
            [enablePatchesKey]: {
              enumerable: false,
              configurable: false,
              value: enablePatches,
            },
            // enableAutoComputed options for state-derived computing
            [enableAutoComputedKey]: {
              enumerable: false,
              configurable: false,
              value: enableAutoComputed,
            },
            // enableInspector options for state changing check before dispatching
            [enableInspectorKey]: {
              enumerable: false,
              configurable: false,
              value: enableInspector,
            },
          });
        } catch (e) {
          console.error(
            `provide: '${ServiceIdentifier.toString()}' has unexpected errors.`
          );
          throw e;
        }
      });
    }
  }
  // #region keep plugin instance order
  mergePluginHooks(pluginHooks, _assignPluginHooks, _pushPluginHooks);
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
  perform(Array.prototype.concat.apply([], subscriptions));
  return store;
}
