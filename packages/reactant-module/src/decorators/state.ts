import { Service } from '../interfaces';
import { stateKey } from '../constants';

// interface Descriptor<T> extends TypedPropertyDescriptor<T> {
//   initializer(): T;
// }

export function state(
  target: any,
  key: string | symbol,
  descriptor?: TypedPropertyDescriptor<any>
) {
  if (typeof key !== 'string') {
    throw new Error(
      `'@state' decorate ${key.toString()} error in ${
        target.constructor.name
      } class, it only supports class properties that decorate keys for string types.`
    );
  }
  if (typeof target[stateKey] === 'undefined') {
    Object.assign(target, {
      [stateKey]: {},
    });
  }
  Object.defineProperty(target, key, {
    ...descriptor,
    enumerable: true,
    configurable: false,
    get(this: Service) {
      return this[stateKey]![key];
    },
    set(this: Service, value: any) {
      this[stateKey]![key] = value;
    },
  });
}
