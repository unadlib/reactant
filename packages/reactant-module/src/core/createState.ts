import { Reducer, Action, AnyAction } from 'redux';

/**
 * ## Description
 *
 * It allows a class state to be defined with a reducer,
 * which is often used in situations where a class state is being migrated from the Redux boilerplate code to the Reactant.
 * And it's often used in conjunction with `dispatch()`.
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
 *       ? action.state[this[identifierKey]].count
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
export function createState<S = any, A extends Action = AnyAction>(
  reducer: Reducer<S, A>
): S {
  return reducer as any;
}
