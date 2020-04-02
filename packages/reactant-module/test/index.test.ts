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
  expect(counter.count).toBe(0);
  expect(Object.values(store.getState())).toEqual([
    { count: 0, others: { list: [] } },
  ]);
  counter.increase();
  expect(counter.count).toBe(1);
  counter.add();
  expect(counter.others.list).toEqual([0]);
  expect(Object.values(store.getState())).toEqual([
    { count: 1, others: { list: [0] } },
  ]);
});

test('module with stagedState about more effects', () => {
  @injectable()
  class Foo0 {
    name = 'foo';

    @state
    count0 = 1;

    @state
    count1 = 1;

    @action
    increase() {
      this.count0 += 1;
    }
  }

  @injectable()
  class Foo extends Foo0 {
    count = 1;

    add(count: number) {
      this.count += count;
    }

    @action
    increase() {
      // inheritance
      super.increase();
      // change state
      this.count0 += 1;
      // call other action function
      this.increase1();
      // call unwrapped `@action` function
      this.add(this.count);
    }

    @action
    increase1() {
      this.count1 += 1;
    }
  }

  @injectable()
  class FooBar {
    constructor(public foo: Foo) {}
  }

  const ServiceIdentifiers = new Map();
  const container = createContainer({
    ServiceIdentifiers,
    modules: [FooBar],
    options: {
      defaultScope: 'Singleton',
    },
  });
  const fooBar = container.get(FooBar);
  const store = createStore(container, ServiceIdentifiers);
  const subscribe = jest.fn();
  store.subscribe(subscribe);
  fooBar.foo.increase();
  expect(fooBar.foo.count0).toBe(3);
  expect(fooBar.foo.count1).toBe(2);
  expect(fooBar.foo.count).toBe(2);
  // merge the multi-actions changed states as one redux dispatch.
  expect(subscribe.mock.calls.length).toBe(1);
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
