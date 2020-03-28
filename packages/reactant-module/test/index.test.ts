import {
  injectable,
  multiInject,
  createContainer,
  createStore,
  ServiceIdentifiersMap,
  action,
} from '..';

test('module with multiple injection', () => {
  @injectable()
  class Foo {
    name = 'foo';

    state = { count: 1 };

    @action
    increase() {
      this.state.count += 1;
    }
  }

  @injectable()
  class FooTest {
    name = 'fooTest';

    state = { count: 1 };
  }

  @injectable()
  class FooBar {
    constructor(@multiInject('FooToken') public foos: Foo[], public foo: Foo) {}
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    FooBar,
    { provide: 'FooToken', useClass: Foo },
    { provide: 'FooToken', useClass: Foo },
    { provide: 'FooToken', useClass: Foo },
    { provide: 'FooToken', useClass: FooTest },
  ];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const fooBar = container.get(FooBar);
  const store = createStore(container, ServiceIdentifiers);
  expect(store.getState()).toEqual({
    FooToken: { count: 1 },
    FooToken1: { count: 1 },
    FooToken2: { count: 1 },
    FooToken3: { count: 1 },
    foo: { count: 1 },
  });
  fooBar.foos[0].increase();
  expect(store.getState()).toEqual({
    FooToken: { count: 2 },
    FooToken1: { count: 1 },
    FooToken2: { count: 1 },
    FooToken3: { count: 1 },
    foo: { count: 1 },
  });
  fooBar.foos[1].increase();
  expect(store.getState()).toEqual({
    FooToken: { count: 2 },
    FooToken1: { count: 2 },
    FooToken2: { count: 1 },
    FooToken3: { count: 1 },
    foo: { count: 1 },
  });
});
