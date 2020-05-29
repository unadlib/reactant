/* eslint-disable func-names */
import { produce } from 'immer';
import { Service } from '../interfaces';
import { storeKey, stateKey, actionIdentifier } from '../constants';

let stagedState: Record<string, unknown> | undefined;

const getStagedState = () => stagedState;

const action = (
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) => {
  const fn = descriptor.value;
  if (typeof fn === 'undefined') {
    throw new Error(`${String(key)} decorate error with '@action'.`);
  }
  const value = function(this: Service, ...args: unknown[]) {
    let time: number;
    if (process.env.NODE_ENV !== 'production') {
      time = Date.now();
    }
    if (typeof stagedState === 'undefined') {
      try {
        const state = produce(
          this[storeKey]?.getState(),
          (draftState: Record<string, unknown>) => {
            stagedState = draftState;
            fn.call(this, ...args);
          }
        );
        stagedState = undefined;
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
          lastState: this[storeKey]?.getState(),
          _reactant: actionIdentifier,
        });
      } finally {
        stagedState = undefined;
      }
    } else {
      // enable staged state mode.
      fn.call(this, ...args);
    }
  };
  return {
    ...descriptor,
    value,
  };
};

export { getStagedState, action };
