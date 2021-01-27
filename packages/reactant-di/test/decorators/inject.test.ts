import { injectable, createContainer, inject, ModuleRef } from '../..';

describe('@inject', () => {
  test('implicit identifier', () => {
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

  test('itself identifier', () => {
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

  test('string identifier', () => {
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

  test('symbol identifier', () => {
    @injectable()
    class Foo {
      public get test() {
        return 'test';
      }
    }

    const FooIdentifier = Symbol('foo');

    @injectable()
    class Bar {
      constructor(@inject(FooIdentifier) public foo: Foo) {}

      public get test() {
        return this.foo.test;
      }
    }

    const bar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [{ provide: FooIdentifier, useClass: Foo }],
    }).get(Bar);

    expect(bar.test).toBe('test');
  });

  test('multiple identifiers', () => {
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

  test('inheritance', () => {
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

  test('`moduleRef` about resolve circular dependency', () => {
    @injectable()
    class Foo {
      constructor(public moduleRef: ModuleRef) {}

      get bar() {
        // eslint-disable-next-line no-use-before-define
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

  test('implicit identifier for changing deps other module with config', () => {
    @injectable()
    class Foo {}

    @injectable()
    class Foo0 {}

    @injectable()
    class Bar {
      constructor(@inject() public foo: Foo) {}
    }

    const bar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [{ provide: Bar, deps: [Foo0] }],
    }).get(Bar);

    expect(bar.foo instanceof Foo0).toBeTruthy();
  });

  test('explicit identifier for changing deps other', () => {
    @injectable()
    class Foo {}

    @injectable()
    class Foo0 {}

    @injectable()
    class Bar {
      constructor(@inject('foo') public foo: Foo) {}
    }

    const bar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [{ provide: Bar, deps: [Foo0] }],
    }).get(Bar);

    expect(bar.foo instanceof Foo0).toBeTruthy();
  });

  test('explicit identifier for changing deps other module with config modules', () => {
    @injectable()
    class Foo {}

    @injectable()
    class Foo0 {}

    @injectable()
    class Bar {
      constructor(@inject('foo') public foo: Foo) {}
    }

    const bar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [
        { provide: Bar, deps: ['foo1'] },
        { provide: 'foo1', useClass: Foo0 },
      ],
    }).get(Bar);

    expect(bar.foo instanceof Foo0).toBeTruthy();
  });

  test('string identifier for changing deps other', () => {
    @injectable()
    class Foo {}

    @injectable()
    class Foo0 {}

    @injectable()
    class Bar {
      constructor(@inject('foo') public foo: Foo) {}
    }

    @injectable()
    class FooBar {
      constructor(@inject('bar') public bar: Bar) {}
    }

    const fooBar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [
        { provide: 'bar', useClass: Bar, deps: ['foo1'] },
        { provide: 'foo1', useClass: Foo0 },
      ],
    }).get(FooBar);

    expect(fooBar.bar.foo instanceof Foo0).toBeTruthy();
  });

  test('metadata identifier for changing deps other module with config', () => {
    @injectable()
    class Foo {}

    @injectable()
    class Foo0 {}

    @injectable()
    class Bar {
      constructor(public foo: Foo) {}
    }

    const bar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [{ provide: Bar, useClass: Bar, deps: [Foo0] }],
    }).get(Bar);

    expect(bar.foo instanceof Foo0).toBeTruthy();
  });

  test('identifier is string, and metadata identifier for changing deps other module with config', () => {
    @injectable()
    class Foo {}

    @injectable()
    class Foo0 {}

    @injectable()
    class Foo1 {}

    @injectable()
    class Bar {
      constructor(public foo0: Foo0, public foo: Foo) {}
    }

    @injectable()
    class FooBar {
      constructor(public bar: Bar) {}
    }

    const fooBar = createContainer({
      ServiceIdentifiers: new Map(),
      modules: [
        { provide: Bar, useClass: Bar, deps: ['foo1', Foo0] },
        { provide: 'foo1', useClass: Foo1 },
      ],
    }).get(FooBar);

    expect(fooBar.bar.foo0 instanceof Foo1).toBeTruthy();
    expect(fooBar.bar.foo instanceof Foo0).toBeTruthy();
  });
});
