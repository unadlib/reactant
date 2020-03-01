/* eslint-disable no-loop-func */
import {
  combineReducers,
  ReducersMapObject,
  createStore as createStoreWithRedux,
  Store,
  PreloadedState,
  Action,
} from 'redux';
import { Container, ServiceIdentifiersMap } from 'reactant-di';
import { ModuleOptions } from '../interfaces';
import { storeKey, reducersKey } from '../constants';

export interface ReactantAction<T = any> extends Action<string> {
  state: Record<string, T>;
}

export function createStore<T = any>(
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  modules: ModuleOptions[],
  preloadedState?: PreloadedState<T>
) {
  let store: Store;
  const reducers: ReducersMapObject = {};
  for (const [Service] of ServiceIdentifiers) {
    // `Service` should be bound before `createStore`.
    if (container.isBound(Service)) {
      const service = container.get(Service);
      const isPlainObject = toString.call(service.state) === '[object Object]';
      if (isPlainObject) {
        const className = (Service as Function).name;
        if (typeof service.name !== 'string' || !service.name) {
          throw new Error(`
            Since '${className}' class has set the module state, '${className}' class must set a unique and valid class property 'name' to be used as the module index.
            Example:
              class FooBar {
                name = 'FooBar'; // <- add the 'name' property.

                state = { foo: false };
              }
          `);
        }
        const isEmptyObject = Object.keys(service.state).length === 0;
        if (!isEmptyObject) {
          // `service[reducersKey]` assign to target instance, others services will use it, example: persistence.
          service[reducersKey] = Object.entries(service.state).reduce(
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
                return action.type === service.name
                  ? action.state[reducerKey]
                  : state;
              };
              return Object.assign(serviceReducersMapObject, {
                [reducerKey]: reducer,
              });
            },
            {}
          );
          Object.assign(reducers, {
            [service.name]: combineReducers(service[reducersKey]),
          });
          // redefine get service state from store state.
          Object.defineProperties(service, {
            state: {
              enumerable: true,
              configurable: false,
              get() {
                return store.getState()[service.name];
              },
            },
          });
          // in order to support multiple instances.
          Object.defineProperties(service, {
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
    }
  }
  const reducer = combineReducers(reducers);
  store = createStoreWithRedux(reducer, preloadedState);
  return store;
}
