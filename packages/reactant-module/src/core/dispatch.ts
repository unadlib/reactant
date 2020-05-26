import { ThisService, ReactantAction } from '../interfaces';
import { storeKey, stateKey, actionIdentifier } from '../constants';

// the api should not be implemented as a decorator
// (because it should return new state should get a the current new state, low performance.)
// support redux actions.
export const dispatch = (
  target: ThisService,
  action: Partial<ReactantAction>
) => {
  // TODO: type constraint.
  if (target[storeKey]) {
    const lastState = target[storeKey]?.getState();
    target[storeKey]!.dispatch({
      type: target.name,
      method: '',
      ...action,
      state: {
        ...lastState,
        [target.name!]: {
          ...target[stateKey],
          ...action.state,
        },
      },
      lastState,
      _reactant: actionIdentifier,
    });
  } else {
    throw new Error(`${target} service should set 'state' property.`);
  }
};
