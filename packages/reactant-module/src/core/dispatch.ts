import { ThisService, ReactantAction } from '../interfaces';
import { storeKey, stateKey, actionIdentifier } from '../constants';

/**
 * ## Description
 *
 * It is used for compatibility with redux actions,
 * when a class state with actions is being migrated from the Redux boilerplate code to the Reactant.
 * And it's often used in conjunction with `createState()`.
 *
 * ## Example
 *
 * ```ts
 * const type = 'count_increase';
 *
 * @injectable()
 * class Counter {
 *   @state
 *   count = createState<number, ReactantAction>((state = 0, action) =>
 *     action.type === type
 *       ? action.state[this.name].count
 *       : state
 *   );
 *
 *   increase() {
 *     dispatch(this, {
 *       type,
 *       state: {
 *         count: this.count + 1,
 *       },
 *     });
 *   }
 * }
 *
 * const app = createApp({
 *   modules: [],
 *   main: Counter,
 *   render: () => {},
 * });
 *
 * app.instance.increase();
 * expect(app.instance.count).toBe(1);
 * ```
 */
export const dispatch = (
  target: ThisService,
  action: Partial<ReactantAction>
) => {
  // the api should not be implemented as a decorator
  // (because it should return new state should get a the current new state, low performance.)
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
