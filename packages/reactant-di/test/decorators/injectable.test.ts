import {
  injectable,
  createContainer,
  inject,
  optional,
  multiInject,
  multiOptional,
} from '../..';

test('only base di with @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable({
    deps: [{ provide: 'Foo', optional: true }],
  })
  class Bar {
    public foo: Foo;

    constructor(foo: any) {
      this.foo = foo;
    }

    get test() {
      return this.foo && this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, { provide: 'Foo', useClass: Foo }],
  }).get(Bar);

  expect(bar.test).toEqual('test');
});
