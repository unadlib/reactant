import {
  injectable,
  multiInject,
  createContainer,
  createStore,
  action,
  state,
} from '..';

test('base module with @state and @action', () => {
  @injectable()
  class Todos {
    @state
    list = [];
  }

  @injectable()
  class Counter {
    @state
    count = 0;

    @state
    others = {
      list: [] as number[],
    };

    @action
    increase() {
      this.count += 1;
    }

    @action
    add() {
      this.others.list.push(this.others.list.length);
    }
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter, Todos];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  const store = createStore(modules, container, ServiceIdentifiers);
  expect(counter.count).toBe(0);
  expect(Object.values(store.getState())).toEqual([
    { count: 0, others: { list: [] } },
    { list: [] },
  ]);
  counter.increase();
  expect(counter.count).toBe(1);
  counter.add();
  expect(counter.others.list).toEqual([0]);
  expect(Object.values(store.getState())).toEqual([
    { count: 1, others: { list: [0] } },
    { list: [] },
  ]);
});

test('module with multiple module injection with same module or others', () => {
  @injectable()
  class Foo {
    name = 'foo';

    @state
    count = 1;

    @action
    increase() {
      this.count += 1;
    }
  }

  @injectable()
  class FooTest {
    name = 'fooTest';

    @state
    count = 1;
  }

  @injectable()
  class FooBar {
    constructor(
      @multiInject('FooIdentifier') public foos: Foo[],
      public foo: Foo
    ) {}
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    FooBar,
    { provide: 'FooIdentifier', useClass: Foo },
    { provide: 'FooIdentifier', useClass: Foo },
    { provide: 'FooIdentifier', useClass: FooTest },
  ];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const fooBar = container.get(FooBar);
  const store = createStore(modules, container, ServiceIdentifiers);
  expect(store.getState()).toEqual({
    FooIdentifier: { count: 1 },
    FooIdentifier1: { count: 1 },
    FooIdentifier2: { count: 1 },
    foo: { count: 1 },
  });
  fooBar.foos[0].increase();
  expect(store.getState()).toEqual({
    FooIdentifier: { count: 2 },
    FooIdentifier1: { count: 1 },
    FooIdentifier2: { count: 1 },
    foo: { count: 1 },
  });
  fooBar.foos[1].increase();
  expect(store.getState()).toEqual({
    FooIdentifier: { count: 2 },
    FooIdentifier1: { count: 2 },
    FooIdentifier2: { count: 1 },
    foo: { count: 1 },
  });
});
