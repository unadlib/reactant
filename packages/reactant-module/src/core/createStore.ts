import {
  combineReducers,
  ReducersMapObject,
  createStore as createStoreWithRedux,
} from 'redux';
import { Container, getServiceIdentifiers } from 'reactant-di';
import { setServicesKeysMap } from '../utils';
import { getStore } from './store';

interface Action<T> {
  type: string;
  states: Record<string, T>;
}

export const reducersKey = Symbol('reducers');

export function createStore(container: Container) {
  const servicesKeysMap = setServicesKeysMap(new Map());
  const reducers: ReducersMapObject = {};
  for (const Service of getServiceIdentifiers()) {
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
        servicesKeysMap.set(service, service.name);
        // `service[reducersKey]` assign to target instance, others services will use it.
        service[reducersKey] = Object.entries(service.state).reduce(
          // eslint-disable-next-line no-loop-func
          (
            serviceReducersMapObject: ReducersMapObject,
            [reducerKey, initialState]
          ) => {
            const reducer = (state = initialState, action: Action<any>) => {
              return action.type === service.name
                ? action.states[reducerKey]
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
              return getStore().getState()[service.name];
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
  return createStoreWithRedux(reducer);
}
