/* eslint-disable no-console */
/* eslint-disable func-names */
import { create } from 'mutative';
import { Patches, ReactantAction, Service } from '../interfaces';
import { actionIdentifier } from '../constants';
import { getRef } from '../core';

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
    const ref = getRef(this);
    if (typeof ref.store === 'undefined') {
      throw new Error(
        `'this' in method '${key.toString()}' of class '${
          target.constructor.name
        }' decorated by '@action' must be bound to the current class instance.`
      );
    }
    if (typeof ref.checkAction === 'function') {
      try {
        ref.checkAction({
          target: this,
          ref,
          method: key,
          args,
        });
      } catch (error) {
        console.error(error);
      }
    } else if (__DEV__ && ref.checkAction !== undefined) {
      throw new Error(
        `The method '${key}' decorated by '@action' must be checked by 'checkAction' option function.`
      );
    }
    if (typeof stagedState === 'undefined') {
      try {
        const lastState = ref.store.getState();
        let state: Record<string, unknown>;
        let patches: Patches | undefined;
        let inversePatches: Patches | undefined;
        if (ref.enablePatches) {
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
              strict: ref.strict,
              enableAutoFreeze: ref.enableAutoFreeze,
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
              strict: ref.strict,
              enableAutoFreeze: ref.enableAutoFreeze,
            }
          );
        }
        stagedState = undefined;
        if (__DEV__) {
          const methodName = `${ref.identifier}.${key.toString()}`;
          if (ref.enableInspector && lastState === state) {
            console.warn(
              `There are no state updates to method '${methodName}'`
            );
          }
        }
        ref.store.dispatch<ReactantAction>({
          type: ref.identifier!,
          method: key,
          params: args,
          state,
          _reactant: actionIdentifier,
          ...(ref.enablePatches
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
