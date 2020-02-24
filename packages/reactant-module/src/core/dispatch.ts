import { Service } from '../interfaces';
import { storeKey, ReactantAction } from './createStore';

// the api should not be implemented as a decorator
// (because it should return new state should get a the current new state, low performance.)
export const dispatch = (target: Service, action: Partial<ReactantAction>) => {
  if (target[storeKey]) {
    target[storeKey]!.dispatch({
      type: target.name,
      ...action,
    });
  } else {
    throw new Error(`${target.name} service should set 'state' property.`);
  }
};
