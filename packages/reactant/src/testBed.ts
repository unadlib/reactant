import { PartialKeys } from 'reactant-module';
import { createApp } from './createApp';
import { Config, App, Renderer } from './interfaces';

/**
 * ## Description
 *
 * You can use `testBed` to build your test code without `render`(`render` function is optional.).
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
 *   constructor(public bar: Bar) {}
 * }
 *
 * const foo = testBed({
 *   modules: [{ provide: Bar, useValue: { getValue: () => 'test' } }],
 *   main: Foo,
 * });
 *
 * expect(foo.instance.bar.getValue()).toBe('test');
 * ```
 */
function testBed<T, S extends any[], R extends Renderer<S>>(
  config: PartialKeys<Config<T, S, R>, 'render'>
): App<T, S, R> {
  return createApp<T, S, R>({
    ...config,
    render:
      config.render ||
      ((() => {
        console.log(`No render function is configured.`);
      }) as any),
  });
}

export { testBed };
