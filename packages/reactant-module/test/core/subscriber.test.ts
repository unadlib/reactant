import {
  injectable,
  createContainer,
  createStore,
  action,
  subscribe,
  watch,
  state,
} from '../..';

test('subscribe in constructor', () => {
  const storeSubscribeFn = jest.fn();
  const subscribeFn = jest.fn();
  const subscribeFn1 = jest.fn();
  const subscribeFn2 = jest.fn();
  const subscribeFn3 = jest.fn();
  const whenFn = jest.fn();

  @injectable()
  class Foo {
    unsubscribe: () => void;

    unsubscribe1: () => void;

    dispose: () => void;

    constructor() {
      this.unsubscribe = subscribe(this, subscribeFn);
      this.unsubscribe1 = subscribe(this, subscribeFn1, { immediate: true });
      this.dispose = watch(this, () => this.count, whenFn);
    }

    @state
    count = 1;

    @state
    list = [{ count: 1 }];

    @action
    increase() {
      this.count += 1;
    }

    @action
    increase1() {
      this.list[0].count += 1;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Foo];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const foo = container.get(Foo);
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
    dynamicModules: new Map(),
    pluginHooks: {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    },
  });
  store.subscribe(() => {
    storeSubscribeFn();
  });
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn1.mock.calls.length).toBe(2);
  expect(subscribeFn.mock.calls).toEqual([[]]);
  expect(whenFn.mock.calls).toEqual([[2, 1]]);
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(2);
  expect(subscribeFn.mock.calls.length).toBe(2);
  expect(subscribeFn1.mock.calls.length).toBe(3);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(3);
  expect(subscribeFn.mock.calls.length).toBe(3);
  expect(subscribeFn1.mock.calls.length).toBe(4);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn1.mock.calls.length).toBe(5);
  expect(whenFn.mock.calls.length).toEqual(2);

  foo.unsubscribe();
  foo.unsubscribe1();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(5);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn1.mock.calls.length).toBe(5);
  expect(whenFn.mock.calls.length).toEqual(3);

  subscribe(foo, subscribeFn2);
  expect(subscribeFn2.mock.calls.length).toBe(0);

  subscribe(foo, subscribeFn3, { immediate: true });
  expect(subscribeFn3.mock.calls.length).toBe(1);

  foo.dispose();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(6);
  expect(whenFn.mock.calls.length).toEqual(3);
  expect(subscribeFn2.mock.calls.length).toBe(1);
  expect(subscribeFn3.mock.calls.length).toBe(2);
});

test('subscribe in non-constructor', () => {
  const storeSubscribeFn = jest.fn();
  const subscribeFn = jest.fn();
  const subscribeFn0 = jest.fn();
  const whenFn = jest.fn();

  @injectable()
  class Foo0 {
    useSubscribe() {
      subscribe(this, subscribeFn0);
    }
  }

  @injectable()
  class Foo {
    constructor(private foo0: Foo0) {
      this.foo0.useSubscribe();
    }

    unsubscribe?: () => void;

    dispose?: () => void;

    init() {
      this.unsubscribe = subscribe(this, subscribeFn);
      this.dispose = watch(this, () => this.count, whenFn);
    }

    @state
    count = 1;

    @state
    list = [{ count: 1 }];

    @action
    increase() {
      this.count += 1;
    }

    @action
    increase1() {
      this.list[0].count += 1;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Foo];
  const container = createContainer({
    ServiceIdentifiers,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const foo = container.get(Foo);
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
    dynamicModules: new Map(),
    pluginHooks: {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    },
  });
  foo.init();
  store.subscribe(() => {
    storeSubscribeFn();
  });
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(1);
  expect(subscribeFn0.mock.calls.length).toBe(1);
  expect(subscribeFn.mock.calls).toEqual([[]]);
  expect(subscribeFn0.mock.calls).toEqual([[]]);
  expect(whenFn.mock.calls).toEqual([[2, 1]]);
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(2);
  expect(subscribeFn.mock.calls.length).toBe(2);
  expect(subscribeFn0.mock.calls.length).toBe(2);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(3);
  expect(subscribeFn.mock.calls.length).toBe(3);
  expect(subscribeFn0.mock.calls.length).toBe(3);
  expect(whenFn.mock.calls).toEqual([
    [2, 1],
    [3, 2],
  ]);
  foo.increase1();
  expect(storeSubscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn0.mock.calls.length).toBe(4);
  expect(whenFn.mock.calls.length).toEqual(2);

  foo.unsubscribe!();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(5);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(subscribeFn0.mock.calls.length).toBe(5);
  expect(whenFn.mock.calls.length).toEqual(3);

  foo.dispose!();
  foo.increase();
  expect(storeSubscribeFn.mock.calls.length).toBe(6);
  expect(whenFn.mock.calls.length).toEqual(3);
});

test('watch multiple values', () => {
  const watchFn0 = jest.fn();
  const watchFn1 = jest.fn();

  @injectable()
  class Counter {
    constructor() {
      watch(this, () => this.count0, watchFn0);

      watch(
        this,
        () => [this.count0, this.text] as const,
        (newValue, oldValue) => {
          watchFn1(newValue, oldValue);
        },
        {
          multiple: true,
        }
      );
    }

    @state
    count0 = 0;

    @action
    increase0() {
      this.count0 += 1;
    }

    @state
    text = '0';

    @action
    setText() {
      this.text = `${Number(this.text) + 1}`;
    }

    @state
    count1 = 0;

    @action
    increase1() {
      this.count1 += 1;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
    dynamicModules: new Map(),
    pluginHooks: {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    },
  });
  expect(watchFn0.mock.calls.length).toBe(0);
  expect(watchFn1.mock.calls.length).toBe(0);

  expect(counter.count0).toBe(0);
  expect(counter.text).toBe('0');
  const subscribeFn = jest.fn();
  store.subscribe(() => {
    subscribeFn();
  });
  counter.increase0();
  expect(counter.count0).toBe(1);
  expect(counter.text).toBe('0');
  expect(counter.count1).toBe(0);
  expect(subscribeFn.mock.calls.length).toBe(1);
  expect(watchFn0.mock.calls.length).toBe(1);
  expect(watchFn1.mock.calls.length).toBe(1);

  counter.setText();
  expect(counter.count0).toBe(1);
  expect(counter.text).toBe('1');
  expect(counter.count1).toBe(0);
  expect(subscribeFn.mock.calls.length).toBe(2);
  expect(watchFn0.mock.calls.length).toBe(1);
  expect(watchFn1.mock.calls.length).toBe(2);

  counter.increase1();
  expect(counter.count0).toBe(1);
  expect(counter.text).toBe('1');
  expect(counter.count1).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(3);
  expect(watchFn0.mock.calls.length).toBe(1);
  expect(watchFn1.mock.calls.length).toBe(2);

  counter.increase0();
  expect(counter.count0).toBe(2);
  expect(counter.text).toBe('1');
  expect(counter.count1).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(watchFn0.mock.calls.length).toBe(2);
  expect(watchFn1.mock.calls.length).toBe(3);
});

test('watch about define `isEqual`', () => {
  const watchFn0 = jest.fn();
  const watchFn1 = jest.fn();

  @injectable()
  class Counter {
    constructor() {
      watch(this, () => this.count0, watchFn0, {
        isEqual: (x, y) => x === 1 || x === y,
      });

      watch(this, () => [this.count0, this.count1], watchFn1, {
        multiple: true,
        isEqual: (x, y) => x === 1 || x === y,
      });
    }

    @state
    count0 = 0;

    @action
    increase0() {
      this.count0 += 1;
    }

    @state
    count1 = 0;

    @action
    increase1() {
      this.count1 += 1;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
    dynamicModules: new Map(),
    pluginHooks: {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    },
  });

  expect(watchFn0.mock.calls.length).toBe(0);
  expect(watchFn1.mock.calls.length).toBe(0);

  expect(counter.count0).toBe(0);
  expect(counter.count1).toBe(0);
  const subscribeFn = jest.fn();
  store.subscribe(() => {
    subscribeFn();
  });
  counter.increase0();
  expect(counter.count0).toBe(1);
  expect(counter.count1).toBe(0);
  expect(subscribeFn.mock.calls.length).toBe(1);
  expect(watchFn0.mock.calls.length).toBe(0);
  expect(watchFn1.mock.calls.length).toBe(0);

  counter.increase0();
  expect(counter.count0).toBe(2);
  expect(counter.count1).toBe(0);
  expect(subscribeFn.mock.calls.length).toBe(2);
  expect(watchFn0.mock.calls.length).toBe(1);
  expect(watchFn1.mock.calls.length).toBe(1);

  counter.increase0();
  expect(counter.count0).toBe(3);
  expect(counter.count1).toBe(0);
  expect(subscribeFn.mock.calls.length).toBe(3);
  expect(watchFn0.mock.calls.length).toBe(2);
  expect(watchFn1.mock.calls.length).toBe(2);

  counter.increase1();
  expect(counter.count0).toBe(3);
  expect(counter.count1).toBe(1);
  expect(subscribeFn.mock.calls.length).toBe(4);
  expect(watchFn0.mock.calls.length).toBe(2);
  expect(watchFn1.mock.calls.length).toBe(2);

  counter.increase1();
  expect(counter.count0).toBe(3);
  expect(counter.count1).toBe(2);
  expect(subscribeFn.mock.calls.length).toBe(5);
  expect(watchFn0.mock.calls.length).toBe(2);
  expect(watchFn1.mock.calls.length).toBe(3);
});
