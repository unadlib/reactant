import { PartialKeys } from 'reactant-module';
import { createApp } from './createApp';
import { Config, App } from './interfaces';

/**
 * **Description:**
 *
 * You can use `testBed` to build your test code without `render`(`render` function is optional.).
 *
 * **Example:**
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
 *   modules: [{ provide: Foo, useValue: { getValue: () => 'test' } }],
 *   main: Foo,
 * });
 *
 * expect(foo.instance.bar.getValue).toBe('test');
 * ```
 */
function testBed<T>(config: PartialKeys<Config<T>, 'render'>): App<T> {
  return createApp<T>({
    ...config,
    render:
      config.render ||
      (() => {
        console.log(`No render function is configured.`);
      }),
  });
}

export { testBed };
