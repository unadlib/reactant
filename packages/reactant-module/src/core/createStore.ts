import {
  combineReducers,
  ReducersMapObject,
  createStore as createStoreWithRedux,
} from 'redux';
import { ServicesKeysMap } from './generateServicesKeys';
import { getRandomString } from '../utils';

const initKey = `@@reactant/INIT${getRandomString()}`;

export const reducersKey = Symbol('reducers');

export function createStore(servicesKeysMap: ServicesKeysMap) {
  const reducers: ReducersMapObject = {};
  for (const [service, [key]] of servicesKeysMap) {
    Object.assign(reducers, {
      [key]: combineReducers(
        (service as any)[reducersKey] || { [initKey]: () => null }
      ),
    });
  }
  const reducer = combineReducers(reducers);
  return createStoreWithRedux(reducer);
}
