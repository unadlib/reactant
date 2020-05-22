/* eslint-disable func-names */
import { produce } from 'immer';
import { Service } from '../interfaces';
import { storeKey, stagedStateKey, stateKey } from '../constants';

export function action(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) {
  const fn = descriptor.value;
  if (typeof fn === 'undefined') {
    throw new Error(`${String(key)} decorate error with '@action'.`);
  }
  const value = function(this: Service, ...args: any[]) {
    let time: number | undefined;
    if (process.env.NODE_ENV !== 'production') {
      time = Date.now();
    }
    if (!this[stagedStateKey]) {
      const state = produce(
        this[stateKey],
        (draftState: Record<string, any>) => {
          this[stagedStateKey] = draftState;
          fn.call(this, ...args);
        }
      );
      this[stagedStateKey] = undefined;
      if (process.env.NODE_ENV !== 'production') {
        if (this[stateKey] === state) {
          console.warn(`There are no state updates to method ${fn.name}`);
        }
        // performance checking
        const executionTime = Date.now() - time!;
        if (executionTime > 100)
          console.warn(
            `The execution time of method '${key.toString()}' is ${executionTime} ms, it's recommended to use 'dispatch' API.`
          );
        // performance detail: https://immerjs.github.io/immer/docs/performance
      }
      this[storeKey]!.dispatch({
        type: this.name,
        method: key,
        state,
        _reactant: true,
      });
    } else {
      // enable staged state mode.
      fn.call(this, ...args);
    }
  };
  return {
    ...descriptor,
    value,
  };
}
