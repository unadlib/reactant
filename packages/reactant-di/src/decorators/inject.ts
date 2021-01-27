import {
  inject as injectWithInversify,
  decorate,
  LazyServiceIdentifer,
} from 'inversify';
import { ServiceIdentifierOrFunc } from '../interfaces';
import { METADATA_KEY } from '../constants';
import { lookupServiceIdentifier } from '../util';
import { forwardRef } from '../forwardRef';

/**
 * ## Description
 *
 * You can use `@inject()` to perform the required dependency injection module to decorate in the constructor of an injectable class.
 *
 * If the default is a dependency injection of the class itself as a type, e.g. `@inject(Foo) foo: Foo`, then it is exactly the same as `foo: Foo`.
 *
 * ## Example
 *
 * ```ts
 * @injectable()
 * class Bar {
 *   getValue() {
 *     return 'bar';
 *   }
 * }
 *
 * @injectable()
 * class Foo {
 *   getValue() {
 *     return 'foo';
 *   }
 * }
 *
 * @injectable()
 * class FooBar {
 *   constructor(@inject() public bar: Bar, @inject('foo') public foo: Foo) {}
 * }
 *
 * const fooBar = testBed({
 *   modules: [
 *    Bar,
 *    { provide: 'foo', useClass: Foo },
 *   ],
 *   main: FooBar,
 * });
 *
 * expect(fooBar.instance.foo.getValue()).toBe('foo');
 * ```
 */
export function inject(serviceIdentifierOrFunc?: ServiceIdentifierOrFunc<any>) {
  return (target: object, key?: string, index?: number) => {
    const self = Reflect.getMetadata(METADATA_KEY.paramtypes, target)[index!];
    let serviceIdentifier: ServiceIdentifierOrFunc<any>;
    if (serviceIdentifierOrFunc instanceof LazyServiceIdentifer) {
      serviceIdentifier = serviceIdentifierOrFunc;
    } else if (typeof serviceIdentifierOrFunc === 'undefined') {
      serviceIdentifier = forwardRef(() =>
        lookupServiceIdentifier(target, self, index)
      );
    } else {
      serviceIdentifier = forwardRef(() =>
        lookupServiceIdentifier(target, serviceIdentifierOrFunc, index)
      );
    }
    decorate(
      injectWithInversify(serviceIdentifier) as ClassDecorator,
      target,
      index
    );
  };
}
