import {
  injectable,
  createContainer,
  getLazyDecorator,
  Container,
} from '../..';

describe('@lazy', () => {
  test('base lazy with cache', () => {
    let container: Container;
    const lazy = getLazyDecorator((serviceIdentifier) =>
      container.get(serviceIdentifier)
    );

    @injectable()
    class Foo {
      public get test() {
        return 'test';
      }
    }

    @injectable()
    class Bar {
      @lazy('foo')
      foo?: Foo;
    }

    container = createContainer({
      ServiceIdentifiers: new Map(),
    });

    const bar = container.get(Bar);

    container.bind('foo').to(Foo);
    expect(bar.foo?.test).toBe('test');
    // eslint-disable-next-line no-self-compare
    expect(bar.foo === bar.foo).toBeTruthy();
    const foo = new Foo();
    bar.foo = foo;
    expect(bar.foo === foo).toBeTruthy();
  });

  test('base lazy without cache', () => {
    let container: Container;
    const lazy = getLazyDecorator((serviceIdentifier) =>
      container.get(serviceIdentifier)
    );

    @injectable()
    class Foo {
      public get test() {
        return 'test';
      }
    }

    @injectable()
    class Bar {
      @lazy('foo', false)
      foo?: Foo;
    }

    container = createContainer({
      ServiceIdentifiers: new Map(),
    });

    const bar = container.get(Bar);

    container.bind('foo').to(Foo);
    expect(bar.foo?.test).toBe('test');
    const oldFoo = bar.foo;
    const foo = new Foo();
    bar.foo = foo;
    expect(bar.foo === foo).toBeFalsy();
    expect(bar.foo === oldFoo).toBeFalsy();
  });
});
