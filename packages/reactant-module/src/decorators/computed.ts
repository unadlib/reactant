/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelectorWithArray } from '../utils';
import { type Computed, computed as signalComputed } from '../core/signal';
import { storeKey, enableAutoComputedKey } from '../constants';
import { type Service } from '../interfaces';
import { getStagedState } from './action';

export function computed(
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
): any;

export function computed(
  depsCallback: (instance: any) => any[]
): (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
) => any;
/**
 * ## Description
 *
 * You can use `@computed` to decorate a getter function for derived data,
 * which quickly solves performance problems for computing derived data.
 *
 * if you want to use `@computed` with non-manually maintained dependencies,
 * you should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.
 *
 * ## Example
 *
 * ```ts
 * class Shop {
 *   @state
 *   fruits = [];
 *
 *   @state
 *   vegetables = [];
 *
 *   @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
 *   get sum() {
 *     return this.fruits.length + this.vegetables.length;
 *   }
 * }
 * ```
 */
export function computed(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    return (
      target: object,
      key: string,
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      const depsCallback = args[0] as (instance: any) => any[];
      if (__DEV__) {
        if (typeof descriptor.get !== 'function') {
          throw new Error(`'@computed' should decorate a getter.`);
        }
        if (typeof depsCallback !== 'function') {
          throw new Error(
            `@computed() parameter should be a selector function for dependencies collection.`
          );
        }
      }
      const depsCallbackSelector = createSelectorWithArray(
        // for performance improvement
        (that: Service) => {
          return [that[storeKey]?.getState()];
        },
        // eslint-disable-next-line func-names
        function (this: Service) {
          return depsCallback(this);
        }
      );
      const selector = createSelectorWithArray((that: Service) => {
        const stagedState = getStagedState();
        if (that[enableAutoComputedKey] && !stagedState) {
          depsCallback(that);
        }
        return depsCallbackSelector.call(that);
      }, descriptor.get!);
      return {
        ...descriptor,
        get(this: Service) {
          return selector.call(this);
        },
      };
    };
  }
  const descriptor = args[2] as TypedPropertyDescriptor<any>;
  if (__DEV__) {
    if (typeof descriptor.get !== 'function') {
      throw new Error(`'@computed' should decorate a getter.`);
    }
  }
  const computedMap: WeakMap<
    object,
    {
      instance: Computed<unknown>;
      storeState?: object;
      value?: unknown;
    }
  > = new WeakMap();
  return {
    ...descriptor,
    get(this: Service) {
      if (!this[enableAutoComputedKey]) {
        // if the auto computed feature is disabled, return the computed value directly.
        if (__DEV__ && this[storeKey]) {
          console.warn(
            `You should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.`
          );
        }
        return descriptor.get!.call(this);
      }
      const stagedState = getStagedState();
      if (!this[storeKey]) {
        return descriptor.get!.call(this);
      }
      let currentComputed = computedMap.get(this);
      if (stagedState) {
        // if the state is staged and the cache value is computed with the current store state, return the cache value.
        if (currentComputed?.storeState === this[storeKey].getState()) {
          return currentComputed!.value;
        }
        // because the state is staged and it's a draft, so the cache value is invalid, so we need to recompute the value without signal computed instance.
        return descriptor.get!.call(this);
      }
      if (!currentComputed) {
        const instance = signalComputed(descriptor.get!.bind(this));
        currentComputed = {
          instance,
        };
        computedMap.set(this, currentComputed);
      }
      const currentValue = currentComputed.instance.value;
      // update the cache value and store state
      currentComputed.value = currentValue;
      currentComputed.storeState = this[storeKey].getState();
      return currentValue;
    },
  };
}

// https://github.com/microsoft/TypeScript/issues/338
