/* eslint-disable no-loop-func */
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
  ModuleOptions,
  ReactantMiddleware,
  ReactantAction,
} from '../interfaces';
import { storeKey, reducersKey, actionIdentifierKey } from '../constants';

export function createStore<T = any>(
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  modules: ModuleOptions[],
  preloadedState?: PreloadedState<T>,
  middlewares?: ReactantMiddleware[]
) {
  let isExistReducer = false;
  let store: Store;
  const reducers: ReducersMapObject = {};
  for (const [Service] of ServiceIdentifiers) {
    // `Service` should be bound before `createStore`.
    if (container.isBound(Service)) {
      const services = container.getAll(Service);
      services.forEach((service, index) => {
        const isPlainObject =
          toString.call(service.state) === '[object Object]';
        if (isPlainObject) {
          const className = (Service as Function).name;
          let reducersIdentifier: string | symbol = service.name;
          const actionIdentifier =
            typeof reducersIdentifier === 'symbol'
              ? reducersIdentifier
              : Symbol('state');
          if (typeof reducersIdentifier !== 'string' || !reducersIdentifier) {
            throw new Error(`
            Since '${className}' module has set the module state, '${className}' module must set a unique and valid class property 'name' to be used as the module index.
            Example:
              class FooBar {
                name = 'FooBar'; // <- add the 'name' property.

                state = { foo: false };
              }
          `);
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
            // `service[reducersKey]` assign to target instance, others services will use it, example: persistence.
            const serviceReducers = Object.entries(service.state).reduce(
              (
                serviceReducersMapObject: ReducersMapObject,
                [reducerKey, value]
              ) => {
                // support pure reducer
                if (typeof value === 'function') {
                  return Object.assign(serviceReducersMapObject, {
                    [reducerKey]: value,
                  });
                }
                const reducer = (state = value, action: ReactantAction) => {
                  return action.type === actionIdentifier
                    ? action.state[reducerKey]
                    : state;
                };
                return Object.assign(serviceReducersMapObject, {
                  [reducerKey]: reducer,
                });
              },
              {}
            );
            isExistReducer = true;
            Object.assign(reducers, {
              [reducersIdentifier]: combineReducers(serviceReducers),
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
            });
            // in order to support multiple instances.
            Object.defineProperties(service, {
              [reducersKey]: {
                enumerable: false,
                configurable: false,
                value: serviceReducers,
              },
              [actionIdentifierKey]: {
                enumerable: false,
                configurable: false,
                value: actionIdentifier,
              },
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
  const reducer = isExistReducer ? combineReducers(reducers) : () => null;
  store = createStoreWithRedux(
    reducer,
    preloadedState,
    middlewares && applyMiddleware(...middlewares)
  );
  return store;
}
