/* eslint-disable func-names */
import { produce } from 'immer';
import { ServiceWithState } from '../interfaces';
import { storeKey, actionIdentifierKey } from '../constants';

// support call super method decorated by `@action`.
let stageState: Record<string, any> | undefined;

export function action(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) {
  const fn = descriptor.value;
  if (typeof fn === 'undefined') {
    throw new Error(`${String(key)} decorate error with '@action'.`);
  }
  const value = function(this: ServiceWithState, ...args: any[]) {
    if (this[storeKey]) {
      const state = produce(this.state, (draftState: Record<string, any>) => {
        stageState = draftState;
        fn.call({ ...this, state: draftState }, ...args);
      });
      stageState = undefined;
      this[storeKey]!.dispatch({
        type: this[actionIdentifierKey],
        name: this.name,
        state,
      });
    } else {
      // inherit `@action` in superclass.
      fn.call({ ...this, state: stageState }, ...args);
    }
  };
  return {
    ...descriptor,
    value,
  };
}
