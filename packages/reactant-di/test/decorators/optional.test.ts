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

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(FooBar);
  expect(fooBar.test).toBeUndefined();
  expect(fooBar.value).toEqual('bar');
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

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo],
  }).get(FooBar);
  expect(fooBar.test).toEqual('test');
  expect(fooBar.value).toEqual('bar');
});

test('base di with @optional, and with setting options for config', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: Foo }],
  }).get(FooBar);
  expect(fooBar.test).toEqual('test');
  expect(fooBar.value).toEqual('bar');
});

test('base di with @optional, and resolve other module', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  class Foo1 {
    public get test() {
      return 'test1';
    }
  }

  @injectable()
  class Bar {
    constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: Foo, useClass: Foo1 }],
  }).get(FooBar);
  expect(fooBar.test).toEqual('test1');
  expect(fooBar.value).toEqual('bar');
});
