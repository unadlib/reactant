import { assign } from '../utils';

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
