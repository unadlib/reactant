import { Watch, WatcherOptionsWithAwaitPromise } from '../interfaces';
import { subscribe } from './subscribe';
import { isEqual as defaultIsEqual } from '../utils';

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
const watch: Watch = (service, selector, watcher, options = {}) => {
  const { multiple = false, isEqual = defaultIsEqual } = options;
  if (typeof watcher !== 'function') {
    const className = Object.getPrototypeOf(service).constructor.name;
    throw new Error(
      `The 'watcher' should be a function in the class '${className}'.`
    );
  }
  let oldValue = selector();
  let ongoing = false;
  const callback = (
    (options as WatcherOptionsWithAwaitPromise<true>)?.awaitPromise
      ? async (...args: Parameters<typeof watcher>) => {
          if (ongoing) return;
          ongoing = true;
          try {
            await watcher(...args);
          } finally {
            ongoing = false;
          }
        }
      : watcher
  ) as (...args: any[]) => ReturnType<typeof watcher>;
  if (multiple) {
    if (!Array.isArray(oldValue)) {
      const className = Object.getPrototypeOf(service).constructor.name;
      throw new Error(
        `The 'selector' should be a function that returns an array as watching multiple values in the class '${className}'.`
      );
    }
    return subscribe(service, () => {
      const newValue = selector();
      const { length } = oldValue;
      for (let i = 0; i < length; i += 1) {
        if (!isEqual(newValue[i], oldValue[i])) {
          const lastValues = oldValue;
          oldValue = newValue;
          callback(newValue, lastValues);
          return;
        }
      }
    });
  }
  return subscribe(service, () => {
    const newValue = selector();
    if (!isEqual(newValue, oldValue)) {
      const lastValue = oldValue;
      oldValue = newValue;
      callback(newValue, lastValue);
    }
  });
};

export { watch };
