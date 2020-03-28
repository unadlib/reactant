import { injectable, createContainer, inject } from '../..';

test('base di with @inject without args', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@inject() public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di with @inject with itself', () => {
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

test('base di with @inject with string token', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@inject('Foo') public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: 'Foo', useClass: Foo }],
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di with @inject with symbol token', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  const FooToken = Symbol('foo');

  @injectable()
  class Bar {
    constructor(@inject(FooToken) public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: FooToken, useClass: Foo }],
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di with @inject with multiple tokens', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(public foo: Foo, @inject('Foo1') public foo1: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [{ provide: 'Foo1', useClass: Foo }],
  }).get(Bar);

  expect(bar.foo === bar.foo1).toBeFalsy();
});
