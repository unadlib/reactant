import { ThisService, ReactantAction } from '../interfaces';
import { storeKey, stateKey } from '../constants';

// the api should not be implemented as a decorator
// (because it should return new state should get a the current new state, low performance.)
// support prue action with redux.
export const dispatch = (
  target: ThisService,
  action: Partial<ReactantAction>
) => {
  // TODO: type constraint.
  if (target[storeKey]) {
    target[storeKey]!.dispatch({
      type: target.name,
      method: '',
      ...action,
      state: {
        ...target[stateKey],
        ...action.state,
      },
    });
  } else {
    throw new Error(`${target} service should set 'state' property.`);
  }
};
