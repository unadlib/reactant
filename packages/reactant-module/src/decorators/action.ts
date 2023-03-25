/* eslint-disable no-console */
/* eslint-disable func-names */
import { create } from 'mutative';
import { Patches, ReactantAction, Service } from '../interfaces';
import {
  storeKey,
  actionIdentifier,
  enablePatchesKey,
  enableAutoFreezeKey,
  identifierKey,
  enableInspectorKey,
  strictKey,
} from '../constants';

let stagedState: Record<string, unknown> | undefined;

const getStagedState = () => stagedState;

/**
 * ## Description
 *
 * `@action` is used to decorate a class method as a action method.
 *
 * ## Example
 *
 * ```ts
 * @injectable()
 * class Counter {
 *   @state
 *   count = 0;
 *
 *   @action
 *   increase() {
 *     this.count += 1;
 *   }
 * }
 *
 * const app = testBed({
 *   modules: [],
 *   main: Counter,
 * });
 *
 * app.instance.increase();
 * expect(app.instance.count).toBe(1);
 * ```
 */
const action = (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) => {
  const fn = descriptor.value!;
  if (__DEV__ && typeof fn !== 'function') {
    throw new Error(
      `${String(key)} can only be decorated by '@action' as a class method.`
    );
  }
  const value = function (this: Service, ...args: unknown[]) {
    if (typeof this[storeKey] === 'undefined') {
      throw new Error(
        `'this' in method '${key.toString()}' of class '${
          target.constructor.name
        }' decorated by '@action' must be bound to the current class instance.`
      );
    }
    if (typeof stagedState === 'undefined') {
      try {
        const lastState = this[storeKey]?.getState();
        let state: Record<string, unknown>;
        let patches: Patches | undefined;
        let inversePatches: Patches | undefined;
        if (this[enablePatchesKey]) {
          [state, patches, inversePatches] = create(
            lastState,
            (draftState) => {
              stagedState = draftState;
              const result = fn.apply(this, args);
              if (__DEV__ && result !== undefined) {
                throw new Error(
                  `The return value of the method '${key}' is not allowed.`
                );
              }
            },
            {
              enablePatches: true,
              strict: this[strictKey],
              enableAutoFreeze: this[enableAutoFreezeKey],
            }
          );
        } else {
          state = create(
            lastState,
            (draftState) => {
              stagedState = draftState;
              const result = fn.apply(this, args);
              if (__DEV__ && result !== undefined) {
                throw new Error(
                  `The return value of the method '${key}' is not allowed.`
                );
              }
            },
            {
              strict: this[strictKey],
              enableAutoFreeze: this[enableAutoFreezeKey],
            }
          );
        }
        stagedState = undefined;
        if (__DEV__) {
          const methodName = `${this[
            identifierKey
          ]?.toString()}.${key.toString()}`;
          if (this[enableInspectorKey] && lastState === state) {
            console.warn(
              `There are no state updates to method '${methodName}'`
            );
          }
        }
        this[storeKey]!.dispatch<ReactantAction>({
          type: this[identifierKey]!,
          method: key,
          params: args,
          state,
          _reactant: actionIdentifier,
          ...(this[enablePatchesKey]
            ? {
                _patches: patches,
                _inversePatches: inversePatches,
              }
            : {}),
        });
      } finally {
        stagedState = undefined;
      }
    } else {
      // enable staged state mode.
      fn.apply(this, args);
    }
  };
  return {
    ...descriptor,
    value,
  };
};

export { getStagedState, action };
