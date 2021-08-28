import { injectable as baseInjectable } from 'reactant-di';
import { nameKey } from '../constants';
import { ModuleDecoratorOptions } from '../interfaces';

/**
 * ## Description
 *
 * You can use `@injectable()` to decorate an injectable module, which will also allow `emitDecoratorMetadata` to take effect in the decorated class, so the corresponding `@inject()` is optional.
 *
 * But if you don't want to use `@injectable()`, then the dependency injection decorator for constructors such as `@inject()` is required, and it must be imported in the corresponding `modules` startup configuration. Therefore, in most cases, it is recommended to use `@injectable()`.
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
 * class Foo {
 *   constructor(@inject() public bar: Bar) {}
 * }
 *
 * @injectable()
 * class FooBar {
 *   constructor(public bar: Bar, public foo: Foo) {}
 * }
 *
 * const fooBar = testBed({
 *   modules: [
 *    Foo // `Foo` is required, but `Bar` will be injected automatically.
 *  ],
 *   main: FooBar,
 * });
 *
 * expect(fooBar.instance.foo.getValue()).toBe('foo');
 * ```
 *
 * If you use JavaScript, then you can only use `@injectable()` to define the full dependency metadata.
 *
 * ```js
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
 * @injectable({
 *   name: 'fooBar',
 *   deps: [Bar,  { provide: 'foo' }],
 * })
 * class FooBar {
 *   constructor(bar, foo) {
 *     this.bar = bar;
 *     this.foo = foo;
 *   }
 * }
 *
 * const fooBar = testBed({
 *   modules: [
 *    Bar,
 *    { provide: 'foo', useClass: Foo },
 *  ],
 *   main: FooBar,
 * });
 *
 * expect(fooBar.instance.foo.getValue()).toBe('foo');
 * ```
 */
export function injectable(options: ModuleDecoratorOptions = {}) {
  const decorate = baseInjectable(options);
  return (target: any) => {
    const { name } = options;
    if (typeof name === 'string') {
      Object.defineProperty(target.prototype, nameKey, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: name,
      });
    } else if (__DEV__ && typeof name !== 'undefined') {
      console.warn(
        `The parameter 'name' of the decorator @injectable(options) used in '${target.name}' class must be a string.`
      );
    }
    return decorate(target);
  };
}
