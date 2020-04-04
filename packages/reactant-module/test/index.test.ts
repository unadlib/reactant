import {
  injectable,
  multiInject,
  createContainer,
  createStore,
  action,
  Service,
} from '..';

test('base module with @state and @action', () => {
  @injectable()
  class Counter implements Service<{ count: number; list: number[] }> {
    state = {
      count: 0,
      list: [] as number[],
    };

    @action
    increase() {
      this.state.count += 1;
    }

    @action
    add() {
      this.state.list.push(this.state.list.length);
    }
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  const store = createStore(container, ServiceIdentifiers);
  expect(counter.state.count).toBe(0);
  expect(Object.values(store.getState())).toEqual([{ count: 0, list: [] }]);
  counter.increase();
  expect(counter.state.count).toBe(1);
  counter.add();
  expect(counter.state.list).toEqual([0]);
  expect(Object.values(store.getState())).toEqual([{ count: 1, list: [0] }]);
});

test('module with multiple module injection with same module or others', () => {
  @injectable()
  class Foo {
    name = 'foo';

    state = {
      count: 1,
    };

    @action
    increase() {
      this.state.count += 1;
    }
  }

  @injectable()
  class FooTest {
    name = 'fooTest';

    state = {
      count: 1,
    };
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
    foo: { count: 1 },
  });
  fooBar.foos[0].increase();
  expect(store.getState()).toEqual({
    FooToken: { count: 2 },
    FooToken1: { count: 1 },
    FooToken2: { count: 1 },
    foo: { count: 1 },
  });
  fooBar.foos[1].increase();
  expect(store.getState()).toEqual({
    FooToken: { count: 2 },
    FooToken1: { count: 2 },
    FooToken2: { count: 1 },
    foo: { count: 1 },
  });
});
