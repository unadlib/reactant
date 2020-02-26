import { ServiceWithState } from '../interfaces';
import { ReactantAction } from './createStore';
import { storeKey } from '../constants';

// the api should not be implemented as a decorator
// (because it should return new state should get a the current new state, low performance.)
// support prue action with redux.
export const dispatch = (
  target: ServiceWithState,
  action: Partial<ReactantAction>
) => {
  if (target[storeKey]) {
    target[storeKey]!.dispatch({
      type: target.name,
      ...action,
    });
  } else {
    throw new Error(`${target.name} service should set 'state' property.`);
  }
};
