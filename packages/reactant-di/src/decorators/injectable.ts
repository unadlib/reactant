/* eslint-disable no-param-reassign */
import { injectable as injectify, decorate } from 'inversify';
import { METADATA_KEY, nameKey } from '../constants';
import { setMetadata } from '../util';
import { ModuleDecoratorOptions } from '../interfaces';
import { inject } from './inject';
import { optional } from './optional';
import { multiInject } from './multiInject';
import { multiOptional } from './multiOptional';

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
  return (target: any) => {
    const { deps = [], name } = options;
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
    deps.forEach((option, index) => {
      if (typeof option === 'function') {
        decorate(inject(option) as ClassDecorator, target, index);
      } else if (toString.call(option) === '[object Object]') {
        if (option.optional && !option.multi) {
          decorate(optional(option.provide) as ClassDecorator, target, index);
        } else if (option.multi && !option.optional) {
          decorate(
            multiInject(option.provide) as ClassDecorator,
            target,
            index
          );
        } else if (option.multi && option.optional) {
          decorate(
            multiOptional(option.provide) as ClassDecorator,
            target,
            index
          );
        } else if (option.provide) {
          decorate(inject(option.provide) as ClassDecorator, target, index);
        } else {
          throw new Error(`@injectable ${option} option error`);
        }
      } else {
        throw new Error(`@injectable ${option} option error`);
      }
    });
    // it has to use `Reflect.getMetadata` with metadata, it just get all injectable deps.
    // so add the services set for `injectable` services.
    setMetadata(METADATA_KEY.provide, target, target);
    decorate(injectify(), target);
    return target;
  };
}
