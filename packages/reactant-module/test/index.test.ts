import {
  injectable,
  multiInject,
  createContainer,
  createStore,
  ServiceIdentifiersMap,
} from '..';

test('module with multiple injection', () => {
  @injectable()
  class Foo {
    name = 'foo';

    state = { count: 1 };
  }

  @injectable()
  class FooTest {
    name = 'fooTest';

    state = { count: 1 };
  }

  @injectable()
  class FooBar {
    constructor(@multiInject('FooToken') public foos: Foo[]) {}
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
  container.get(FooBar);
  const store = createStore(container, ServiceIdentifiers, modules);
  expect(store.getState()).toEqual({
    foo: { count: 1 },
    foo1: { count: 1 },
    foo2: { count: 1 },
    fooTest: { count: 1 },
  });
});
