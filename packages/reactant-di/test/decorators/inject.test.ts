import { injectable, createContainer, inject, ModuleRef } from '../..';

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

test('base di with @inject about inheritance', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Bar {
    constructor(public foo: Foo) {}
  }

  @injectable()
  class Bar1 extends Bar {
    constructor(public foo: Foo) {
      super(foo);
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar1);

  expect(bar.foo instanceof Foo).toBeTruthy();
});

test('base di with `moduleRef` about resolve circular dependency', () => {
  @injectable()
  class Foo {
    constructor(public moduleRef: ModuleRef) {}

    get bar() {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return this.moduleRef.get(Bar);
    }
  }

  @injectable()
  class Bar {
    constructor(public foo: Foo) {}
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.foo.bar instanceof Bar).toBeTruthy();
});
