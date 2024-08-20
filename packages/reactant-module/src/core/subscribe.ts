/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Unsubscribe } from 'redux';
import { Subscribe } from '../interfaces';
import { storeKey, subscriptionsKey, unsubscriptionsKey } from '../constants';

/**
 * ## Description
 *
 * You can use `subscribe` to subscribe to state changes in any class module.
 *
 * ## Example
 *
 * ```ts
 * @injectable()
 * class Counter {
 *   constructor() {
 *     subscribe(this, () => {
 *       if (this.count === 3) {
 *         console.log(`new value: ${newValue}`);
 *       }
 *     });
 *   }
 *
 *   @state
 *   count = 0;
 *
 *   @action
 *   increase() {
 *     this.count += 0;
 *   }
 * }
 *
 * const app = testBed({
 *   modules: [],
 *   main: Counter,
 * });
 * ```
 */
const subscribe: Subscribe = (service, listener, { immediate } = {}) => {
  if (typeof listener !== 'function') {
    throw new Error(`The 'listener' should be a function.`);
  }
  let unsubscribe: Unsubscribe;
  if (service[storeKey]) {
    if (immediate) {
      try {
        listener();
      } catch (error) {
        console.error(error);
      }
    }
    unsubscribe = service[storeKey]?.subscribe(listener)!;
  } else {
    // When constructing
    const subscriptions = service[subscriptionsKey] ?? [];
    let _unsubscribe: Unsubscribe;
    subscriptions.push(() => {
      if (immediate) {
        try {
          listener();
        } catch (error) {
          console.error(error);
        }
      }
      _unsubscribe = service[storeKey]?.subscribe(listener)!;
    });
    unsubscribe = () => {
      return _unsubscribe();
    };
    Object.assign(service, {
      [subscriptionsKey]: subscriptions,
    });
  }
  const unsubscriptions = service[unsubscriptionsKey] ?? new Set();
  const fn = () => {
    unsubscribe();
    unsubscriptions.delete(fn);
  };
  unsubscriptions.add(fn);
  if (!service[unsubscriptionsKey]) {
    Object.assign(service, {
      [unsubscriptionsKey]: unsubscriptions,
    });
  }
  return fn;
};

export { subscribe };
