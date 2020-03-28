import {
  injectable,
  createContainer,
  inject,
  optional,
  multiInject,
  multiOptional,
} from '../..';

test('base di with @optional, and without setting options', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(FooBar);
  expect(fooBar.bar instanceof Bar).toBeTruthy();
  expect(fooBar.bar.foo).toBeUndefined();
});

test('base di with @optional, and with setting options', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo],
  }).get(FooBar);
  expect(fooBar.bar instanceof Bar).toBeTruthy();
});

test('base di with @optional, and with setting options for config', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: Foo }],
  }).get(FooBar);

  expect(fooBar.bar.foo instanceof Foo).toBeTruthy();
});

test('base di with @optional, and resolve other module', () => {
  @injectable()
  class Foo {}

  class Foo1 {}

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: Foo, useClass: Foo1 }],
  }).get(FooBar);
  expect(fooBar.bar.foo instanceof Foo1).toBeTruthy();
});
