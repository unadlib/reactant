import { Watch } from '../interfaces';
import { subscribe } from './subscribe';
import { isEqual } from '../utils';

/**
 * ## Description
 *
 * You can use `watch` to observe a specific state changes in any class module.
 *
 * ## Example
 *
 * ```ts
 * @injectable()
 * class Counter {
 *   constructor() {
 *     watch(this, () => this.count, (newValue) => {
 *       if (newValue === 3) {
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
const watch: Watch = (service, selector, watcher) => {
  if (typeof watcher !== 'function') {
    throw new Error(`The 'watcher' should be a function.`);
  }
  let oldValue = selector();
  return subscribe(service, () => {
    const newValue = selector();
    if (!isEqual(newValue, oldValue)) {
      watcher(newValue, oldValue);
      oldValue = newValue;
    }
  });
};

export { watch };
