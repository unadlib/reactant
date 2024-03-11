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
  const computedMap: WeakMap<object, Computed<unknown>> = new WeakMap();
  return {
    ...descriptor,
    get(this: Service) {
      if (!this[enableAutoComputedKey]) {
        if (__DEV__) {
          console.warn(
            `You should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.`
          );
        }
        return descriptor.get!.call(this);
      }
      const stagedState = getStagedState();
      if (!this[storeKey] || stagedState) {
        return descriptor.get!.call(this);
      }
      let currentComputed = computedMap.get(this);
      if (!currentComputed) {
        currentComputed = signalComputed(descriptor.get!.bind(this));
        computedMap.set(this, currentComputed);
      }
      return currentComputed.value;
    },
  };
}

// https://github.com/microsoft/TypeScript/issues/338
