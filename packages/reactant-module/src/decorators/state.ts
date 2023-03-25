import { Service, PropertyDescriptor } from '../interfaces';
import { stateKey } from '../constants';

/**
 * ## Description
 *
 * `@state` is used to decorate a class property as a state field.
 *
 * ## Example
 *
 * ```ts
 * @injectable()
 * class Counter {
 *   @state
 *   count = 0;
 * }
 *
 * const app = testBed({
 *   modules: [],
 *   main: Counter,
 * });
 *
 * expect(app.instance.count).toBe(0);
 * ```
 */
export function state(
  target: object,
  key: string | symbol,
  descriptor?: PropertyDescriptor<any>
) {
  const service: Service = target;
  if (__DEV__ && typeof key !== 'string') {
    throw new Error(
      `'@state' decorate ${key.toString()} error in ${
        target.constructor.name
      } class, it only supports class properties that decorate keys for string types.`
    );
  }
  Object.assign(target, {
    [stateKey]: {
      ...service[stateKey],
      [key]: undefined,
    },
  });
}
