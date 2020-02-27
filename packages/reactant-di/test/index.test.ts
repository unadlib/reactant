import { injectable, createContainer, inject } from '..';

test('base di without @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  class Bar {
    public constructor(@inject(Foo) public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const foo = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, Foo],
  }).get(Foo);

  expect(foo.test).toBe('test');
});
