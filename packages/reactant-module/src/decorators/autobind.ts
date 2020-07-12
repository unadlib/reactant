import { assign } from '../utils';

/**
 * ## Description
 *
 * You can use `@autobind` and decorate any class method that binds the instance of the current class as its `this`,
 * it can also be used with `@action`.
 *
 * ## Example
 *
 * ```ts
 * class Shop {
 *   @state
 *   count = 0;
 *
 *   list: string[] = [];
 *
 *   @autobind
 *   @action
 *   increase() {
 *     this.count += 0;
 *   }
 *
 *   @autobind
 *   addGood(text) {
 *     this.list.push(text);
 *   }
 * }
 *
 * const app = testBed({
 *   modules: [],
 *   main: Shop,
 * });
 *
 * const { increase, addGood } = app.instance;
 * increase();
 * addGood('apple');
 * expect(app.instance.count).toBe(1);
 * expect(app.instance.list).toEqual(['apple']);
 * ```
 */
export function autobind(
  target: object,
  key: string | symbol,
  { value, configurable, enumerable }: TypedPropertyDescriptor<any>
) {
  if (typeof value !== 'function') {
    throw new SyntaxError(
      `@autobind decorator must be applied to functions not: ${typeof value}`
    );
  }
  return {
    configurable,
    enumerable,
    get() {
      if (this === target) {
        return value;
      }
      if (
        target.constructor !== this.constructor &&
        target.constructor === Object.getPrototypeOf(this).constructor
      ) {
        return value;
      }
      const boundFn = value.bind(this);
      assign(this, key, boundFn, { enumerable: false });
      return boundFn;
    },
    set(setValue: any) {
      assign(this, key, setValue);
    },
  };
}
