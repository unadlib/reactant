import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  computed,
} from '../..';

describe('@computed', () => {
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
    const store = createStore(
      modules,
      container,
      ServiceIdentifiers,
      new Set(),
      (...args: any[]) => {},
      {
        middleware: [],
        beforeCombineRootReducers: [],
        afterCombineRootReducers: [],
        enhancer: [],
        preloadedStateHandler: [],
        afterCreateStore: [],
        provider: [],
      }
    );
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(2);
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
    createStore(
      modules,
      container,
      ServiceIdentifiers,
      new Set(),
      (...args: any[]) => {},
      {
        middleware: [],
        beforeCombineRootReducers: [],
        afterCombineRootReducers: [],
        enhancer: [],
        preloadedStateHandler: [],
        afterCreateStore: [],
        provider: [],
      }
    );
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
  test('more type vale', () => {
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
      const store = createStore(
        modules,
        container,
        ServiceIdentifiers,
        new Set(),
        (...args: any[]) => {},
        {
          middleware: [],
          beforeCombineRootReducers: [],
          afterCombineRootReducers: [],
          enhancer: [],
          preloadedStateHandler: [],
          afterCreateStore: [],
          provider: [],
        }
      );
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
    const computedFn = jest.fn();

    @injectable()
    class BaseCounter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: BaseCounter) => [count])
      get num() {
        computedFn();
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
    const store = createStore(
      modules,
      container,
      ServiceIdentifiers,
      new Set(),
      (...args: any[]) => {},
      {
        middleware: [],
        beforeCombineRootReducers: [],
        afterCombineRootReducers: [],
        enhancer: [],
        preloadedStateHandler: [],
        afterCreateStore: [],
        provider: [],
      }
    );
    expect(computedFn.mock.calls.length).toBe(0);
    expect(foo.counter.num).toBe(1);
    expect(foo.baseCounter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(1);
    foo.counter.increase();
    expect(foo.counter.num).toBe(2);
    expect(foo.baseCounter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(3);
    foo.counter.increase();
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(1);
    expect(computedFn.mock.calls.length).toBe(5);
    foo.baseCounter.increase();
    expect(foo.counter.num).toBe(3);
    expect(foo.baseCounter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(7);
  });
});
