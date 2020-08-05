import { optional as optionalWithInversify, decorate } from 'inversify';
import { inject } from './inject';
import { ServiceIdentifier } from '../interfaces';
import { METADATA_KEY } from '../constants';
import { setMetadata } from '../util';

/**
 * ## Description
 *
 * You can use `@optional()` to decorate an optionally injected module.
 *
 * If other modules have no relevant dependency injection or are also optionally injected, the module will not be injected by default unless the injected module is imported in the `modules` parameter.
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
 *   constructor(@optional() public bar: Bar, @optional('foo') public foo: Foo) {}
 * }
 *
 * const fooBar = testBed({
 *   modules: [
 *    { provide: 'foo', useClass: Foo },
 *   ],
 *   main: FooBar,
 * });
 *
 * expect(fooBar.instance.foo.getValue()).toBe('foo');
 * expect(fooBar.fooBar.bar).toBeUndefined();
 * ```
 */
export function optional(serviceIdentifier?: ServiceIdentifier<any>) {
  return (target: object, targetKey?: string, index?: number) => {
    const paramtypes = Reflect.getMetadata(METADATA_KEY.paramtypes, target);
    setMetadata(METADATA_KEY.optional, paramtypes[index!], serviceIdentifier);
    decorate(inject(serviceIdentifier) as ClassDecorator, target, index);
    decorate(optionalWithInversify() as ClassDecorator, target, index);
  };
}
