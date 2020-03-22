import {
  injectable,
  createContainer,
  inject,
  optional,
  multiInject,
  multiOptional,
} from '../..';

test('base di with @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di with @injectable and @inject', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@inject(Foo) public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di without @injectable and @inject without token', () => {
  class Foo {
    public get test() {
      return 'test';
    }
  }

  class Bar {
    constructor(@inject() public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, Foo],
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di hybrid with @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  class Bar {
    constructor(@inject(Foo) public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, Foo],
  }).get(Bar);

  expect(bar.test).toBe('test');
});

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
