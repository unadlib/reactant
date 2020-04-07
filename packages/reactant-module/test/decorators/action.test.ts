import { injectable, createContainer, state, createStore, action } from '../..';

test('base `@action` decorate', () => {
  @injectable()
  class Counter {
    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
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
  counter.increase();
  expect(counter.count).toBe(1);
  expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
});

test('`@action` with base devOptions pararms', () => {
  @injectable()
  class Counter {
    name = 'counter';

    @state
    count = 0;

    @state
    sum = { count: 0 };

    @action
    increase() {
      this.sum.count += 1;
    }

    increase1() {
      this.sum.count += 1;
    }

    increase2() {
      this.count += 1;
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
  const couter = container.get(Counter);
  const store = createStore(
    container,
    ServiceIdentifiers,
    undefined,
    undefined,
    undefined,
    { autoFreeze: true }
  );
  expect(() => {
    store.getState().counter.sum.count = 1;
  }).toThrowError(/Cannot assign to read only property/);
  couter.increase();
  for (const fn of [
    () => {
      store.getState().counter.sum.count = 1;
    },
    () => couter.increase1(),
    () => couter.increase2(),
  ]) {
    expect(fn).toThrowError(/Cannot assign to read only property/);
  }
});

test('`@action` in inherited module with stagedState about more effects', () => {
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

    @action
    decrease() {
      this.count0 -= 1;
    }

    @action
    decrease1() {
      this.count0 -= 1;
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

    @action
    decrease() {
      super.decrease();
      this.count0 -= 1;
    }

    decrease1() {
      super.decrease1();
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
  // inheritance
  fooBar.foo.decrease();
  expect(fooBar.foo.count0).toBe(1);
  fooBar.foo.decrease1();
  expect(fooBar.foo.count0).toBe(0);
});
