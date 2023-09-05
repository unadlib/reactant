import { injectable, createContainer, inject, optional, multiInject } from '..';

test('decoration for interface', () => {
  interface FooInterface {
    readonly test: string;
  }

  @injectable()
  class Foo implements FooInterface {
    public get test() {
      return 'test';
    }
  }

  interface BarInterface {
    readonly test: string;
    readonly value: string;
  }

  @injectable()
  class Bar {
    constructor(
      @optional('Foo') public foo: FooInterface,
      @optional('Foo1') public foo1: FooInterface
    ) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get test1() {
      return this.foo1 && this.foo1.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    constructor(@inject('Bar') public bar: BarInterface) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo', useClass: Foo },
      { provide: 'Bar', useClass: Bar },
    ],
  }).get(FooBar);
  expect(fooBar.test).toEqual('test');
  expect((fooBar.bar as any).test1).toBeUndefined();
  expect(fooBar.bar.test).toEqual('test');
  expect(fooBar.value).toEqual('bar');
});

test('with useValue and useFactory config', () => {
  interface FooInterface {
    readonly test: string;
  }

  interface BarInterface {
    readonly test: string;
    readonly value: string;
  }

  @injectable()
  class Bar {
    constructor(
      @inject('Foo') public foo: FooInterface,
      @optional('Foo1') public foo1: FooInterface,
      @optional('Foo2') public foo2: any
    ) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get test1() {
      return this.foo1 && this.foo1.test;
    }

    public get test2() {
      return this.foo2 && this.foo2.test;
    }

    public get value() {
      return 'bar';
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo', useValue: { test: 'test' } },
      {
        provide: 'Foo2',
        useFactory: (foo, foo1) => [foo.test, foo1?.test],
        deps: ['Foo', { provide: 'Foo1', optional: true }],
      },
    ],
  }).get(Bar);
  expect(bar.foo2).toEqual(['test', undefined]);
});

test('inheritance', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Bar {
    constructor(@inject() public foo: Foo) {}
  }

  @injectable()
  class Bar1 extends Bar {
    constructor(@optional() public foo: Foo) {
      super(foo);
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar1);

  expect(bar.foo).toBeUndefined();
});

test('mix @optional/@inject about inheritance', () => {
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
    constructor(@optional() public foo: Foo, public foo1: Foo1) {
      super(foo);
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo],
  }).get(Bar1);

  expect(bar.foo instanceof Foo).toBeTruthy();
  expect(bar.foo1 instanceof Foo1).toBeTruthy();
});

test('Container APIs: got/gotAll', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class FooBar {}

  @injectable()
  class FooBar1 {}

  @injectable()
  class FooBar2 {}

  @injectable()
  class Bar {
    constructor(
      @multiInject(Foo) public foos: Foo[],
      public fooBar: FooBar,
      @optional() public fooBar2: FooBar2
    ) {}

    public get length() {
      return this.foos.length;
    }
  }

  const ServiceIdentifiers = new Map();

  const container = createContainer({
    ServiceIdentifiers,
    modules: [Foo, Foo, FooBar],
    options: {
      defaultScope: 'Singleton',
    },
  });

  const bar = container.get(Bar);
  const fooBar = container.get(FooBar);

  expect(bar.length).toBe(2);
  expect(bar.fooBar instanceof FooBar).toBeTruthy();
  expect(bar.fooBar).toBe(fooBar);
  expect(container.got(FooBar)).toBe(fooBar);
  expect(container.gotAll(Foo)!.length).toBe(2);
  expect(container.gotAll(Foo)).toEqual(bar.foos);
  expect(container.got(FooBar1)).toBeUndefined();
  expect(container.gotAll(FooBar1)).toBeUndefined();
  expect(() => {
    expect(container.got(FooBar2)).toBeUndefined();
    expect(container.gotAll(FooBar2)).toBeUndefined();
  }).not.toThrowError();
});
