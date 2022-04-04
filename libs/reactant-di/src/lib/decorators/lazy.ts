import { ServiceIdentifier } from '../interfaces';
import { METADATA_KEY } from '../constants';

/**
 * ## Description
 *
 * You can get a decorator `@lazy(serviceIdentifier)` with `getLazyDecorator((serviceIdentifier) => container.get(serviceIdentifier))`,
 * and use it on any one dependency property that you need to lazily get.
 *
 * ## Example
 *
 * ```ts
 * let container: Container;
 * const lazy = getLazyDecorator((serviceIdentifier) =>
 *   container.get(serviceIdentifier)
 * );
 *
 * @injectable()
 * class Foo {
 *   public get test() {
 *     return 'test';
 *   }
 * }
 *
 * @injectable()
 * class Bar {
 *   @lazy('foo')
 *   foo?: Foo;
 * }
 *
 * container = createContainer({
 *   ServiceIdentifiers: new Map(),
 * });
 *
 * const bar = container.get(Bar);
 *
 * container.bind('foo').to(Foo);
 * expect(bar.foo?.test).toBe('test');
 * ```
 */
export const getLazyDecorator = (
  getService: (
    serviceIdentifier: ServiceIdentifier<unknown>,
    target?: object
  ) => unknown
) => (serviceIdentifier: ServiceIdentifier<unknown>, enableCache = true) => {
  return (target: object, key: string | symbol) => {
    function getter(this: object) {
      if (enableCache && !Reflect.hasMetadata(METADATA_KEY.lazy, this, key)) {
        const service = getService(serviceIdentifier, this);
        if (service !== null) {
          Reflect.defineMetadata(METADATA_KEY.lazy, service, this, key);
        }
      }
      if (Reflect.hasMetadata(METADATA_KEY.lazy, this, key)) {
        return Reflect.getMetadata(METADATA_KEY.lazy, this, key);
      }
      return getService(serviceIdentifier, this);
    }

    function setter(this: object, newVal: unknown) {
      if (enableCache) {
        Reflect.defineMetadata(METADATA_KEY.lazy, newVal, this, key);
      } else {
        console.warn(`
          Disable cache and the property ${key.toString()} in class "${
          this.constructor.name
        }" instance failed to set value.
        `);
      }
    }

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get: getter,
      set: setter,
    });
  };
};
