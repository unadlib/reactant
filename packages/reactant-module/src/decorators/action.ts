/* eslint-disable func-names */
import { produce } from 'immer';
import { Service } from '../interfaces';
import { storeKey } from '../constants';

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
  const value = function(this: Service, ...args: any[]) {
    let time: number | undefined;
    if (process.env.NODE_ENV !== 'production') {
      time = Date.now();
    }
    if (this[storeKey]) {
      const state = produce(this.state, (draftState: Record<string, any>) => {
        stageState = draftState;
        fn.call({ ...this, state: draftState }, ...args);
      });
      stageState = undefined;
      this[storeKey]!.dispatch({
        type: this.name,
        method: key,
        state,
        _reactant: true,
      });
      if (process.env.NODE_ENV !== 'production') {
        // performance checking
        const executionTime = Date.now() - time!;
        if (executionTime > 100)
          console.warn(
            `The execution time of method '${key.toString()}' is ${executionTime} ms, it's recommended to use 'dispatch' API.`
          );
        // performance detail: https://immerjs.github.io/immer/docs/performance
      }
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
