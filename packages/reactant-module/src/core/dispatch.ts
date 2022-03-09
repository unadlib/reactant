import { AnyAction } from 'redux';
import { ThisService } from '../interfaces';
import { storeKey } from '../constants';

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
 * interface CountAction {
 *  type: typeof type;
 *  state: number;
 * }
 *
 * @injectable()
 * class Counter {
 *  @state
 *  count = createState<CountAction['state'], CountAction>(
 *    ($state = 0, $action) => ($action.type === type ? $action.state : $state)
 *  );
 *
 *  increase() {
 *    dispatch<CountAction>(this, {
 *      type,
 *      state: this.count + 1,
 *    });
 *  }
 * }
 *
 * const app = createApp({
 *   modules: [],
 *   main: Counter,
 *   render: () => () => {},
 * });
 *
 * app.instance.increase();
 * expect(app.instance.count).toBe(1);
 * ```
 */
export const dispatch = <T extends AnyAction = AnyAction>(
  target: ThisService,
  action: T
) => {
  // the api should not be implemented as a decorator
  // (because it should return new state should get a the current new state, low performance.)
  if (target[storeKey]) {
    target[storeKey]!.dispatch(action);
  } else {
    throw new Error(
      `Store for '${target.constructor.name}' service does not exist, and make sure you have set any Redux state.`
    );
  }
};
