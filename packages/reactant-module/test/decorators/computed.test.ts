/* eslint-disable no-use-before-define */
import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  computed,
  untracked,
} from '../..';

describe('@computed', () => {
  test('base', () => {
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @computed(({ count }: Counter) => [count])
      get num() {
        return this.count + 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: Counter) => [count])
      get num() {
        computedFn();
        return this.count + 1;
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
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(2);
  });
  test('base - action with calling computed - 1', () => {
    const computedFn = jest.fn();
    @injectable()
    class Counter {
      @state
      count = { value: 0 };

      @action
      increase() {
        expect(this.num === this.count).toBe(false);
        expect(this.num === this.count).toBe(false);
        this.count.value += 1;
      }

      @computed(({ count }: Counter) => [count])
      get num() {
        computedFn();
        return this.count;
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
    expect(computedFn.mock.calls.length).toBe(0);
    expect(counter.num.value).toBe(0);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(computedFn.mock.calls.length).toBe(1);
    expect(Object.values(store.getState())[0]).toEqual({ count: { value: 1 } });
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    counter.increase();
    expect(counter.num.value).toBe(2);
    expect(computedFn.mock.calls.length).toBe(3);
  });
  test('base - action with calling computed - 2', () => {
    const computedFn = jest.fn();
    @injectable()
    class Counter {
      @state
      count = { value: 0 };

      @action
      increase() {
        // !!! first call computed
        expect(this.num === this.count).toBe(this.num === this.count);
        this.count.value += 1;
      }

      @computed(({ count }: Counter) => [count])
      get num() {
        computedFn();
        return this.count;
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
    expect(computedFn.mock.calls.length).toBe(0);
    // expect(counter.num.value).toBe(0);
    // expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(computedFn.mock.calls.length).toBe(1);
    expect(Object.values(store.getState())[0]).toEqual({ count: { value: 1 } });
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    counter.increase();
    expect(counter.num.value).toBe(2);
    expect(computedFn.mock.calls.length).toBe(3);
  });
  test('NaN and object value', () => {
    const computedCountFn = jest.fn();

    @injectable()
    class Counter {
      @state
      count = 0;

      @state
      others = {
        list: [] as number[],
        count: 0,
      };

      @action
      increase() {
        this.count += 1;
      }

      @action
      decrease() {
        this.others.count -= 1;
      }

      @action
      add() {
        this.others.list.push(this.others.list.length + 1);
      }

      @computed(({ count, others }: Counter) => [
        count,
        others.list,
        NaN,
        Symbol.for(''),
        '',
        0,
        'foo',
        false,
        null,
        undefined,
      ])
      get sum() {
        computedCountFn();
        return this.others.list.reduce((sum, item) => sum + item, this.count);
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
    createStore({
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
    expect(computedCountFn.mock.calls.length).toBe(0);
    expect(counter.sum).toBe(0);
    expect(computedCountFn.mock.calls.length).toBe(1);
    expect(counter.sum).toBe(0);
    expect(counter.sum).toBe(0);
    expect(computedCountFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.sum).toBe(1);
    expect(computedCountFn.mock.calls.length).toBe(2);
    counter.add();
    expect(counter.sum).toBe(2);
    expect(computedCountFn.mock.calls.length).toBe(3);
    counter.decrease();
    expect(counter.sum).toBe(2);
    expect(counter.sum).toBe(2);
    expect(computedCountFn.mock.calls.length).toBe(3);
  });
  test('more type value', () => {
    for (const getValue of [
      () => [],
      () => ({}),
      () => Symbol(''),
      () => () => ({}),
    ]) {
      const computedFn = jest.fn();

      @injectable()
      class Counter {
        @state
        count = 0;

        @state
        count1 = 0;

        @action
        increase1() {
          this.count1 += 1;
        }

        @computed(() => [getValue()])
        get num() {
          computedFn();
          return this.count + 1;
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
      expect(computedFn.mock.calls.length).toBe(0);
      counter.increase1();
      expect(counter.num).toBe(1);
      expect(computedFn.mock.calls.length).toBe(1);
      counter.increase1();
      expect(counter.num).toBe(1);
      expect(computedFn.mock.calls.length).toBe(2);
    }
  });
  test('inheritance', () => {
    @injectable()
    class BaseCounter {
      computedFn = jest.fn();

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: BaseCounter) => [count])
      get num() {
        this.computedFn();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter extends BaseCounter {}

    @injectable()
    class Foo {
      constructor(public counter: Counter, public baseCounter: BaseCounter) {}
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
    expect(foo.counter.computedFn.mock.calls.length).toBe(0);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(0);
    expect(foo.counter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.computedFn.mock.calls.length).toBe(1);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    expect(foo.counter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.computedFn.mock.calls.length).toBe(1);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    foo.counter.increase();
    expect(foo.counter.num).toBe(2);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.computedFn.mock.calls.length).toBe(2);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    foo.counter.increase();
    expect(foo.counter.num).toBe(3);
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.num).toBe(3);
    expect(foo.counter.computedFn.mock.calls.length).toBe(3);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    foo.baseCounter.increase();
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(2);
    expect(foo.counter.computedFn.mock.calls.length).toBe(3);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(2);
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(2);
    expect(foo.counter.computedFn.mock.calls.length).toBe(3);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(2);
  });
});

describe('@computed with automatic dependencies collection', () => {
  test('base', () => {
    const computedFn = jest.fn();
    @injectable()
    class Counter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + 1;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(2);
  });
  test('base - action with calling computed - 1', () => {
    const computedFn = jest.fn();
    @injectable()
    class Counter {
      @state
      count = { value: 0 };

      @action
      increase() {
        expect(this.num === this.count).toBe(true);
        this.count.value += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    expect(counter.num.value).toBe(0);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(computedFn.mock.calls.length).toBe(2);
    expect(Object.values(store.getState())[0]).toEqual({ count: { value: 1 } });
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(3);
    counter.increase();
    expect(counter.num.value).toBe(2);
    expect(computedFn.mock.calls.length).toBe(5);
  });
  test('base - action with calling computed - 2', () => {
    const computedFn = jest.fn();
    @injectable()
    class Counter {
      @state
      count = { value: 0 };

      @action
      increase() {
        // !!! first call computed
        expect(this.num === this.count).toBe(true);
        expect(this.num === this.count).toBe(true);
        this.count.value += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    // expect(counter.num.value).toBe(0);
    // expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(computedFn.mock.calls.length).toBe(2);
    expect(Object.values(store.getState())[0]).toEqual({ count: { value: 1 } });
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(counter.num.value).toBe(1);
    expect(computedFn.mock.calls.length).toBe(3);
    counter.increase();
    // !!! if you want to have a better performance, you need to use `computed` with dependencies collection args.
    expect(counter.num.value).toBe(2);
    expect(computedFn.mock.calls.length).toBe(6);
    expect(counter.num.value).toBe(2);
    expect(computedFn.mock.calls.length).toBe(6);
  });
  test('base with multi-state', () => {
    const computedFn = jest.fn();
    @injectable()
    class Counter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @state
      count1 = 0;

      @action
      increase1() {
        this.count1 += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + this.count1;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1, count1: 0 });
    expect(counter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(2);
    counter.increase1();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(3);
  });
  test('base with multi-state in multi-modules', () => {
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.count - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + this.counter0.count;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 0 });
    expect(counter.num).toBe(0);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(0);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(counter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    counter.counter0.increase();
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(3);
  });
  test('base with multi-computed - 1', () => {
    const computedFn0 = jest.fn();
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn0();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + 1 + this.counter0.num;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    expect(computedFn0.mock.calls.length).toBe(1);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(computedFn0.mock.calls.length).toBe(2);
    counter.increase();
    expect(counter.num).toBe(4);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(computedFn0.mock.calls.length).toBe(2);
    counter.counter0.increase();
    expect(counter.num).toBe(5);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(computedFn0.mock.calls.length).toBe(3);
    expect(counter.num).toBe(5);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(computedFn0.mock.calls.length).toBe(3);
  });
  test('base with multi-computed - 2', () => {
    const computedFn0 = jest.fn();
    const computedFn1 = jest.fn();
    const computedFn = jest.fn();
    @injectable()
    class Counter0 {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn0();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter1 {
      constructor(public counter0: Counter0) {}

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn1();
        if (this.count > 1) {
          return this.count + 100;
        }
        return this.count + this.counter0.num;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter1: Counter1) {}

      @state
      count = this.counter1.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + 1 + this.counter1.num;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    expect(computedFn0.mock.calls.length).toBe(1);
    expect(computedFn1.mock.calls.length).toBe(1);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn1.mock.calls.length).toBe(2);
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn1.mock.calls.length).toBe(2);
    counter.increase();
    expect(counter.num).toBe(4);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn1.mock.calls.length).toBe(2);
    counter.counter1.increase();
    expect(counter.num).toBe(5);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn1.mock.calls.length).toBe(3);
    expect(counter.num).toBe(5);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn1.mock.calls.length).toBe(3);
    expect(counter.counter1.counter0.count).toBe(0);
    expect(counter.counter1.counter0.count).toBe(0);
    expect(counter.counter1.counter0.num).toBe(1);
    expect(counter.counter1.count).toBe(1);
    expect(counter.counter1.num).toBe(2);
    expect(counter.counter1.counter0.num).toBe(1);

    counter.counter1.counter0.increase();
    expect(counter.counter1.count).toBe(1);
    expect(counter.counter1.counter0.count).toBe(1);
    expect(counter.counter1.counter0.num).toBe(2);
    expect(counter.counter1.num).toBe(3);

    expect(counter.num).toBe(6);
    expect(computedFn.mock.calls.length).toBe(4);
    expect(computedFn0.mock.calls.length).toBe(3);
    expect(computedFn1.mock.calls.length).toBe(4);
    expect(counter.num).toBe(6);
    expect(computedFn.mock.calls.length).toBe(4);
    expect(computedFn0.mock.calls.length).toBe(3);
    expect(computedFn1.mock.calls.length).toBe(4);

    counter.counter1.increase();
    expect(counter.counter1.count).toBe(2);
    expect(counter.counter1.counter0.count).toBe(1);
    expect(counter.counter1.counter0.num).toBe(2);
    expect(counter.counter1.num).toBe(102);
    expect(counter.num).toBe(105);
    expect(computedFn.mock.calls.length).toBe(5);
    expect(computedFn0.mock.calls.length).toBe(3);
    expect(computedFn1.mock.calls.length).toBe(5);

    counter.counter1.counter0.increase();
    expect(counter.counter1.count).toBe(2);
    expect(counter.counter1.counter0.count).toBe(2);
    expect(counter.counter1.counter0.num).toBe(3);
    expect(counter.counter1.num).toBe(102);
    expect(counter.num).toBe(105);
    expect(computedFn.mock.calls.length).toBe(5);
    // only change counter0 count and it will only trigger computedFn0 computed
    expect(computedFn0.mock.calls.length).toBe(4);
    expect(computedFn1.mock.calls.length).toBe(5);
  });
  test('base with single-computed in multi-modules', () => {
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      get num() {
        return this.count + 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + 1 + this.counter0.num;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(4);
    expect(computedFn.mock.calls.length).toBe(2);
    counter.counter0.increase();
    expect(counter.num).toBe(5);
    expect(computedFn.mock.calls.length).toBe(3);
    expect(counter.num).toBe(5);
    expect(computedFn.mock.calls.length).toBe(3);
  });
  test('base mix different computed - 1', () => {
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @computed
      get num() {
        return this.count + 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: Counter) => [count])
      get num() {
        computedFn();
        return this.count + 1;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(2);
  });
  test('base mix different computed - 2', () => {
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @computed(({ count }: Counter0) => [count])
      get num() {
        return this.count + 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + 1;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(2);
  });
  test('base mix different computed - 3', () => {
    const computedFn0 = jest.fn();
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: Counter0) => [count])
      get num() {
        computedFn0();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = this.counter0.num - 1;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + this.counter0.num;
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn0.mock.calls.length).toBe(1);
    expect(computedFn.mock.calls.length).toBe(0);
    expect(counter.counter0.num).toBe(1);
    expect(counter.num).toBe(1);

    expect(Object.values(store.getState())[0]).toEqual({ count: 0 });

    counter.counter0.increase();
    expect(counter.num).toBe(2);
    expect(counter.counter0.num).toBe(2);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn.mock.calls.length).toBe(2);

    expect(counter.num).toBe(2);
    expect(counter.counter0.num).toBe(2);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn.mock.calls.length).toBe(2);

    counter.increase();
    expect(counter.num).toBe(3);
    expect(counter.counter0.num).toBe(2);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn.mock.calls.length).toBe(3);
  });
  test('NaN and object value', () => {
    for (const value of [
      NaN,
      Symbol.for(''),
      '',
      0,
      'foo',
      false,
      null,
      // undefined,
    ]) {
      const computedFn = jest.fn();

      @injectable()
      class Counter {
        @state
        value: any = {};

        @action
        setValue(_value: any) {
          this.value = _value;
        }

        @computed
        get sum() {
          // eslint-disable-next-line no-unused-expressions
          this.value;
          computedFn();
          return this.others.list.reduce((sum, item) => sum + item, this.count);
        }

        @state
        count = 0;

        @state
        others = {
          list: [] as number[],
          count: 0,
        };

        @action
        increase() {
          this.count += 1;
        }

        @action
        decrease() {
          this.others.count -= 1;
        }

        @action
        add() {
          this.others.list.push(this.others.list.length + 1);
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
      createStore({
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
        devOptions: {
          autoComputed: true,
        },
      });
      expect(computedFn.mock.calls.length).toBe(0);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(1);
      expect(counter.sum).toBe(0);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(1);
      counter.setValue(value);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(2);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(2);

      counter.increase();
      expect(counter.sum).toBe(1);
      expect(computedFn.mock.calls.length).toBe(3);
      expect(counter.sum).toBe(1);
      expect(computedFn.mock.calls.length).toBe(3);
      counter.add();
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(4);
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(4);
      counter.decrease();
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(5);
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(5);
    }
  });
  test('NaN and object value - noChanges', () => {
    for (const value of [
      NaN,
      Symbol.for(''),
      '',
      0,
      'foo',
      false,
      null,
      // undefined,
    ]) {
      const computedFn = jest.fn();

      @injectable()
      class Counter {
        @state
        value: any = value;

        @action
        setValue(_value: any) {
          this.value = _value;
        }

        @computed
        get sum() {
          // eslint-disable-next-line no-unused-expressions
          this.value;
          computedFn();
          return this.others.list.reduce((sum, item) => sum + item, this.count);
        }

        @state
        count = 0;

        @state
        others = {
          list: [] as number[],
          count: 0,
        };

        @action
        increase() {
          this.count += 1;
        }

        @action
        decrease() {
          this.others.count -= 1;
        }

        @action
        add() {
          this.others.list.push(this.others.list.length + 1);
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
      createStore({
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
        devOptions: {
          autoComputed: true,
        },
      });
      expect(computedFn.mock.calls.length).toBe(0);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(1);
      expect(counter.sum).toBe(0);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(1);
      counter.setValue(value);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(1);
      expect(counter.sum).toBe(0);
      expect(computedFn.mock.calls.length).toBe(1);

      counter.increase();
      expect(counter.sum).toBe(1);
      expect(computedFn.mock.calls.length).toBe(2);
      expect(counter.sum).toBe(1);
      expect(computedFn.mock.calls.length).toBe(2);
      counter.add();
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(3);
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(3);
      counter.decrease();
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(4);
      expect(counter.sum).toBe(2);
      expect(computedFn.mock.calls.length).toBe(4);
    }
  });
  test('inheritance', () => {
    @injectable()
    class BaseCounter {
      computedFn = jest.fn();

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        this.computedFn();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter extends BaseCounter {}

    @injectable()
    class Foo {
      constructor(public counter: Counter, public baseCounter: BaseCounter) {}
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(foo.counter.computedFn.mock.calls.length).toBe(0);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(0);
    expect(foo.counter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.computedFn.mock.calls.length).toBe(1);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    expect(foo.counter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.computedFn.mock.calls.length).toBe(1);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    foo.counter.increase();
    expect(foo.counter.num).toBe(2);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.computedFn.mock.calls.length).toBe(2);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    foo.counter.increase();
    expect(foo.counter.num).toBe(3);
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(foo.counter.num).toBe(3);
    expect(foo.counter.computedFn.mock.calls.length).toBe(3);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(1);
    foo.baseCounter.increase();
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(2);
    expect(foo.counter.computedFn.mock.calls.length).toBe(3);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(2);
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(2);
    expect(foo.counter.computedFn.mock.calls.length).toBe(3);
    expect(foo.baseCounter.computedFn.mock.calls.length).toBe(2);
  });
  test('untracked', () => {
    const computedFn0 = jest.fn();
    const computedFn = jest.fn();

    @injectable()
    class Counter0 {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn0();
        return this.count + 1;
      }
    }
    @injectable()
    class Counter {
      constructor(public counter0: Counter0) {}

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed
      get num() {
        computedFn();
        return this.count + untracked(() => this.counter0.num);
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
      devOptions: {
        autoComputed: true,
      },
    });
    expect(computedFn.mock.calls.length).toBe(0);
    expect(computedFn0.mock.calls.length).toBe(0);
    expect(counter.num).toBe(1);
    counter.increase();
    expect(Object.values(store.getState())[0]).toEqual({ count: 1 });
    expect(counter.num).toBe(2);
    expect(counter.counter0.num).toBe(1);
    expect(computedFn0.mock.calls.length).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    expect(counter.num).toBe(2);
    expect(counter.counter0.num).toBe(1);
    expect(computedFn0.mock.calls.length).toBe(1);
    expect(computedFn.mock.calls.length).toBe(2);
    counter.counter0.increase();
    expect(counter.num).toBe(2);
    expect(counter.counter0.num).toBe(2);
    expect(computedFn0.mock.calls.length).toBe(2);
    expect(computedFn.mock.calls.length).toBe(2);
  });
});
