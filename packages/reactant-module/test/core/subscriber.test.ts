import {
  injectable,
  createContainer,
  createStore,
  ServiceIdentifiersMap,
  action,
  subscribe,
  watch,
} from '../..';

test('subscribe in constructor', () => {
  const storeSubscribeFn = jest.fn();
  const subscribeFn = jest.fn();
  const whenFn = jest.fn();

  @injectable()
  class Foo {
    unsubscribe: () => void;

    dispose: () => void;

    constructor() {
      this.unsubscribe = subscribe(this, subscribeFn);
      this.dispose = watch(this, () => this.state.count, whenFn);
    }

    state = { count: 1, list: [{ count: 1 }] };

    @action
    increase() {
      this.state.count += 1;
    }

    @action
    increase1() {
      this.state.list[0].count += 1;
    }
  }

  const ServiceIdentifiers = new Map();
  const container = createContainer({
    ServiceIdentifiers,
    modules: [Foo],
    options: {
      defaultScope: 'Singleton',
    },
  });
  const foo = container.get(Foo);
  const store = createStore(container, ServiceIdentifiers);
  store.subscribe(() => {
    storeSubscribeFn();
  });
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls).toEqual([[]]);
  expect(whenFn.mock.calls).toEqual([[2, 1]]);
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(2);
  expect(subscribeFn.mock.calls.length).toBe(2);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(3);
  expect(subscribeFn.mock.calls.length).toBe(3);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(whenFn.mock.calls.length).toEqual(2);

  foo.unsubscribe();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(5);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(whenFn.mock.calls.length).toEqual(3);

  foo.dispose();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(6);
  expect(whenFn.mock.calls.length).toEqual(3);
});

test('subscribe in non-constructor', () => {
  const storeSubscribeFn = jest.fn();
  const subscribeFn = jest.fn();
  const whenFn = jest.fn();

  @injectable()
  class Foo {
    unsubscribe?: () => void;

    dispose?: () => void;

    init() {
      this.unsubscribe = subscribe(this, subscribeFn);
      this.dispose = watch(this, () => this.state.count, whenFn);
    }

    state = { count: 1, list: [{ count: 1 }] };

    @action
    increase() {
      this.state.count += 1;
    }

    @action
    increase1() {
      this.state.list[0].count += 1;
    }
  }

  const ServiceIdentifiers = new Map();
  const container = createContainer({
    ServiceIdentifiers,
    modules: [Foo],
    options: {
      defaultScope: 'Singleton',
    },
  });
  const foo = container.get(Foo);
  const store = createStore(container, ServiceIdentifiers);
  foo.init();
  store.subscribe(() => {
    storeSubscribeFn();
  });
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls).toEqual([[]]);
  expect(whenFn.mock.calls).toEqual([[2, 1]]);
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(2);
  expect(subscribeFn.mock.calls.length).toBe(2);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(3);
  expect(subscribeFn.mock.calls.length).toBe(3);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(whenFn.mock.calls.length).toEqual(2);

  foo.unsubscribe!();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(5);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(whenFn.mock.calls.length).toEqual(3);

  foo.dispose!();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(6);
  expect(whenFn.mock.calls.length).toEqual(3);
});
