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
import { ViewModule } from './view';
import { ModuleOptions } from '../interfaces';

export interface ReactantAction<T = any> extends Action<string> {
  state: Record<string, T>;
}

export const reducersKey: unique symbol = Symbol('reducers');
export const storeKey: unique symbol = Symbol('store');

export function createStore<T = any>(
  container: Container,
  ServiceIdentifiers: ServiceIdentifiersMap,
  injectConnector: (service: object | ViewModule) => void,
  modules: ModuleOptions[],
  preloadedState?: PreloadedState<T>
) {
  let store: Store;
  const reducers: ReducersMapObject = {};
  for (const [Service] of ServiceIdentifiers) {
    const service = container.get(Service);
    injectConnector(service);
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
            [reducerKey, initialState]
          ) => {
            const reducer = (state = initialState, action: ReactantAction) => {
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
  const reducer = combineReducers(reducers);
  store = createStoreWithRedux(reducer, preloadedState);
  return store;
}
