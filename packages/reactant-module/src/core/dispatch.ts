import { Service, ReactantAction } from '../interfaces';
import { storeKey, actionIdentifierKey } from '../constants';

// the api should not be implemented as a decorator
// (because it should return new state should get a the current new state, low performance.)
// support prue action with redux.
export const dispatch = (target: Service, action: Partial<ReactantAction>) => {
  if (target[storeKey]) {
    target[storeKey]!.dispatch({
      type: target[actionIdentifierKey],
      // for debugging
      name: {
        module: target.name,
      },
      ...action,
    });
  } else {
    throw new Error(`${target} service should set 'state' property.`);
  }
};
