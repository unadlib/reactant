/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelectorWithArray } from '../utils';
import { computed as signalComputed } from '../core/signal';
import { storeKey } from '../constants';
import { Service } from '../interfaces';
import { getStagedState } from './action';

/**
 * ## Description
 *
 * You can use `@computed` to decorate a getter function for derived data,
 * which quickly solves performance problems for computing derived data.
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
export const computed: any = (...args: any[]) => {
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
        (that: Service) => [that[storeKey]?.getState()],
        // eslint-disable-next-line func-names
        function (this: Service) {
          return depsCallback(this);
        }
      );
      const selector = createSelectorWithArray(
        (that: Service) => depsCallbackSelector.call(that),
        descriptor.get!
      );
      return {
        ...descriptor,
        get(this: Service) {
          return selector.call(this);
        },
      };
    };
  }
  const computedMap: WeakMap<object, any> = new WeakMap();
  return {
    ...args[2],
    get(this: Service) {
      if (!this[storeKey]) {
        return args[2].get.call(this);
      }
      let currentComputed = computedMap.get(this);
      if (!currentComputed) {
        currentComputed = signalComputed(args[2].get.bind(this));
        computedMap.set(this, currentComputed);
      }
      return currentComputed.value;
    },
  };
};

// https://github.com/microsoft/TypeScript/issues/338
