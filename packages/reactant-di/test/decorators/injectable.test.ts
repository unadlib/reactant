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
  class Foo {}

  @injectable({
    deps: [{ provide: 'Foo', optional: true }],
  })
  class Bar {
    public foo: Foo;

    constructor(foo: any) {
      this.foo = foo;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, { provide: 'Foo', useClass: Foo }],
  }).get(Bar);

  expect(bar.foo instanceof Foo).toBeTruthy();
});

test('only base di with @injectable about multi-deps', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Foo0 {}

  @injectable()
  class Foo1 {}

  @injectable()
  class Foo2 {}

  @injectable()
  class Foo3 {}

  @injectable()
  class Foo4 {}

  @injectable({
    deps: [
      Foo,
      { provide: Foo0 },
      { provide: 'Foo1' },
      { provide: 'Foo2', optional: true },
      { provide: 'Foos', multi: true },
      { provide: 'OptionalFoos', multi: true, optional: true },
    ],
  })
  class Bar {
    public foo: Foo;

    public foo0: Foo0;

    public foo1: Foo1;

    public foo2: any;

    public foos: Foo3[];

    public optionalFoos: Foo4[];

    constructor(
      foo: any,
      foo0: any,
      foo1: any,
      foo2: any,
      foos: any[],
      optionalFoos: any[]
    ) {
      this.foo = foo;
      this.foo0 = foo0;
      this.foo1 = foo1;
      this.foo2 = foo2;
      this.foos = foos;
      this.optionalFoos = optionalFoos;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo1', useClass: Foo1 },
      { provide: 'Foos', useClass: Foo3 },
    ],
  }).get(Bar);

  expect(bar instanceof Bar).toBeTruthy();
  expect(bar.foo instanceof Foo).toBeTruthy();
  expect(bar.foo0 instanceof Foo0).toBeTruthy();
  expect(bar.foo1 instanceof Foo1).toBeTruthy();
  expect(bar.foo2).toBeUndefined();
  expect(bar.foos[0] instanceof Foo3).toBeTruthy();
  expect(bar.optionalFoos).toEqual([]);
});

test('only base di with @injectable about multi-deps(import optional)', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Foo0 {}

  @injectable()
  class Foo1 {}

  @injectable()
  class Foo2 {}

  @injectable()
  class Foo3 {}

  @injectable()
  class Foo4 {}

  @injectable({
    deps: [
      Foo,
      { provide: Foo0 },
      { provide: 'Foo1' },
      { provide: 'Foo2', optional: true },
      { provide: 'Foos', multi: true },
      { provide: 'OptionalFoos', multi: true, optional: true },
    ],
  })
  class Bar {
    public foo: Foo;

    public foo0: Foo0;

    public foo1: Foo1;

    public foo2: any;

    public foos: Foo3[];

    public optionalFoos: Foo4[];

    constructor(
      foo: any,
      foo0: any,
      foo1: any,
      foo2: any,
      foos: any[],
      optionalFoos: any[]
    ) {
      this.foo = foo;
      this.foo0 = foo0;
      this.foo1 = foo1;
      this.foo2 = foo2;
      this.foos = foos;
      this.optionalFoos = optionalFoos;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo1', useClass: Foo1 },
      { provide: 'Foo2', useClass: Foo2 },
      { provide: 'Foos', useClass: Foo3 },
      { provide: 'OptionalFoos', useClass: Foo4 },
    ],
  }).get(Bar);

  expect(bar instanceof Bar).toBeTruthy();
  expect(bar.foo instanceof Foo).toBeTruthy();
  expect(bar.foo0 instanceof Foo0).toBeTruthy();
  expect(bar.foo1 instanceof Foo1).toBeTruthy();
  expect(bar.foo2 instanceof Foo2).toBeTruthy();
  expect(bar.foos[0] instanceof Foo3).toBeTruthy();
  expect(bar.optionalFoos[0] instanceof Foo4).toBeTruthy();
});
