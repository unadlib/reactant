/* eslint-disable func-names */
import { produce } from 'immer';
import { ServiceWithState } from '../interfaces';
import { storeKey } from '../constants';

// support call super method decorated by `@action`.
let stagedState: Record<string, any> | undefined;

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
        stagedState = draftState;
        fn.call({ ...this, state: draftState }, ...args);
      });
      stagedState = undefined;
      this[storeKey]!.dispatch({
        type: this.name,
        state,
      });
    } else {
      // inherit `@action` in superclass.
      fn.call({ ...this, state: stagedState }, ...args);
    }
  };
  return {
    ...descriptor,
    value,
  };
}
