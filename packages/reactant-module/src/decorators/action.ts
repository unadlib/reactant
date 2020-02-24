/* eslint-disable func-names */
import { produce, applyPatches } from 'immer';
import { storeKey } from '../core/createStore';
import { Service } from '../interfaces';

let tempState: unknown;

export function action(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<Function>
) {
  const fn = descriptor.value;
  if (typeof fn === 'undefined') {
    throw new Error(`${String(key)} decorate error with '@action'.`);
  }
  const value = function(this: Service, ...args: unknown[]) {
    if (this[storeKey]) {
      const state = produce(
        this.state,
        (draftState: Record<string, unknown>) => {
          tempState = draftState;
          fn.call({ ...this, state: draftState }, ...args);
        }
      );
      tempState = undefined;
      this[storeKey].dispatch({
        type: this.name,
        state,
      });
    } else {
      // support inherit `action`.
      fn.call({ ...this, state: tempState }, ...args);
    }
  };
  return {
    ...descriptor,
    value,
  };
}
