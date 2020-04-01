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

test('base di with @optional about inheritance', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Foo1 {}

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}
  }

  @injectable()
  class Bar1 extends Bar {
    constructor(@optional() public foo: Foo, @optional() public foo1: Foo1) {
      super(foo);
    }
  }
  let bar1: Bar1;
  bar1 = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar1);

  expect(bar1.foo).toBeUndefined();
  expect(bar1.foo1).toBeUndefined();

  bar1 = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo],
  }).get(Bar1);

  expect(bar1.foo instanceof Foo).toBeTruthy();
  expect(bar1.foo1).toBeUndefined();

  bar1 = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo, Foo1],
  }).get(Bar1);

  expect(bar1.foo instanceof Foo).toBeTruthy();
  expect(bar1.foo1 instanceof Foo1).toBeTruthy();
});