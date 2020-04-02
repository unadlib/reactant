import { Service, PropertyDescriptor } from '../interfaces';
import { stateKey } from '../constants';

export function state(
  target: any,
  key: string | symbol,
  descriptor?: PropertyDescriptor<any>
  // it must return any or void type;
): any {
  if (typeof key !== 'string') {
    throw new Error(
      `'@state' decorate ${key.toString()} error in ${
        target.constructor.name
      } class, it only supports class properties that decorate keys for string types.`
    );
  }
  if (descriptor && typeof descriptor.initializer === 'function') {
    // just support decorators for ES6 classes.
    // https://tc39.es/proposal-decorators/#runtime-semantics-class-field-definition-evaluation
    Object.assign(target, {
      [stateKey]: {
        ...target[stateKey],
        [key]: descriptor.initializer.call(target),
      },
    });
  } else if (typeof target[stateKey] === 'undefined') {
    // 1. assign empty object for TS decorators.
    Object.assign(target, {
      [stateKey]: {},
    });
  }
  // TS decorators: https://github.com/Microsoft/TypeScript/issues/2249
  return {
    ...descriptor,
    enumerable: true,
    configurable: false,
    get(this: Service) {
      return this[stateKey]![key];
    },
    set(this: Service, value: any) {
      // 2. initializ set a init value after execute wrapped property with TS decorators.
      this[stateKey]![key] = value;
    },
  };
}
