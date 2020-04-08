import { Service, PropertyDescriptor } from '../interfaces';
import { stateKey, initializerKey } from '../constants';

export function state(
  target: object,
  key: string | symbol,
  descriptor?: PropertyDescriptor<any>
  // it must return any or void type;
) {
  const service: Service = target;
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
        ...service[stateKey],
        [key]: descriptor.initializer.call(target),
      },
    });
    if (!service[initializerKey]) {
      Object.assign(target, {
        [initializerKey]: true,
      });
    }
  } else if (typeof service[stateKey] === 'undefined') {
    // 1. assign empty object for TS decorators.
    Object.assign(target, {
      [stateKey]: {
        [key]: undefined,
      },
    });
  } else {
    // sign when enable `useDefineForClassFields` in TS.
    // eslint-disable-next-line no-param-reassign
    service[stateKey]![key] = undefined;
  }
  // TS decorators: https://github.com/Microsoft/TypeScript/issues/2249
}
