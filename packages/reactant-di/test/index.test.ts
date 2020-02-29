import {
  injectable,
  createContainer,
  inject,
  optional,
  multiInject,
  multiOptional,
} from '..';

test('base di with @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@inject(Foo) public foo: Foo) {}

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
    public constructor(@inject() public foo: Foo) {}

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
    public constructor(@inject(Foo) public foo: Foo) {}

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

test('base di with @optional, and without setting options', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    public constructor(public bar: Bar) {}

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
    public constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    public constructor(public bar: Bar) {}

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
    public constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    public constructor(public bar: Bar) {}

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
    public constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    public constructor(public bar: Bar) {}

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

test('base di with decoration for interface', () => {
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
    public constructor(
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
    public constructor(@inject('Bar') public bar: BarInterface) {}

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

test('base di with useValue and useFactory config', () => {
  interface FooInterface {
    readonly test: string;
  }

  interface BarInterface {
    readonly test: string;
    readonly value: string;
  }

  @injectable()
  class Bar {
    public constructor(
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

test('base di with @multiInject', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@multiInject(Foo) public foos: Foo[]) {}

    public get length() {
      return this.foos.length;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo, Foo],
  }).get(Bar);

  expect(bar.length).toBe(2);
});

test('base di with @multiInject for token', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@multiInject('Foo') public foos: Foo[]) {}

    public get length() {
      return this.foos.length;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo', useClass: Foo },
      { provide: 'Foo', useValue: 'test' },
    ],
  }).get(Bar);

  expect(bar.length).toBe(2);
  expect(bar.foos[1]).toBe('test');
});

test('base di with @multiOptional for token', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@multiOptional('Foo') public foos: Foo[]) {}

    public get length() {
      return this.foos.length;
    }
  }

  let bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.foos).toEqual([]);

  bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo', useClass: Foo },
      { provide: 'Foo', useValue: 'test' },
    ],
  }).get(Bar);

  expect(bar.length).toBe(2);
  expect(bar.foos[1]).toBe('test');
});
