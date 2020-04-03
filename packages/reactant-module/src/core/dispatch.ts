import { Service, ReactantAction } from '../interfaces';
import { storeKey } from '../constants';

// the api should not be implemented as a decorator
// (because it should return new state should get a the current new state, low performance.)
// support prue action with redux.
export const dispatch = (target: Service, action: Partial<ReactantAction>) => {
  // TODO: type constraint.
  if (target[storeKey]) {
    target[storeKey]!.dispatch({
      type: target.name,
      method: '',
      ...action,
    });
  } else {
    throw new Error(`${target} service should set 'state' property.`);
  }
};
