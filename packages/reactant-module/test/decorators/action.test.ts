import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  getStagedState,
} from '../..';

describe('@action', () => {
  test('base', () => {
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
    counter.increase();
    expect(counter.count).toBe(1);
    expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
  });

  test('enable `autoFreeze` in devOptions', () => {
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
      },
      undefined,
      { autoFreeze: true }
    );
    expect(() => {
      store.getState().counter.sum.count = 1;
    }).toThrowError(/Cannot assign to read only property/);
    counter.increase();
    for (const fn of [
      () => {
        store.getState().counter.sum.count = 1;
      },
      () => counter.increase1(),
      () => counter.increase2(),
    ]) {
      expect(fn).toThrowError(/Cannot assign to read only property/);
    }
  });

  test('inherited module with stagedState about more effects', () => {
    @injectable()
    class Foo0 {
      name = 'foo0';

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
      name = 'foo';

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
      constructor(public foo: Foo, public foo0: Foo0) {}
    }

    const ServiceIdentifiers = new Map();
    const modules = [FooBar];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    const fooBar = container.get(FooBar);
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
    const subscribe = jest.fn();
    store.subscribe(subscribe);
    fooBar.foo.increase();
    expect(fooBar.foo.count0).toBe(3);
    expect(fooBar.foo.count1).toBe(2);
    expect(fooBar.foo.count).toBe(2);
    fooBar.foo0.increase();
    expect(fooBar.foo.count0).toBe(3);
    expect(fooBar.foo.count1).toBe(2);
    expect(fooBar.foo.count).toBe(2);
    // merge the multi-actions changed states as one redux dispatch.
    expect(subscribe.mock.calls.length).toBe(2);
    // inheritance
    fooBar.foo.decrease();
    expect(fooBar.foo.count0).toBe(1);
    fooBar.foo.decrease1();
    expect(fooBar.foo.count0).toBe(0);
  });

  test('across module changing state', () => {
    @injectable()
    class Foo {
      @state
      textList: string[] = [];

      @action
      addText(text: string) {
        this.textList.push(text);
      }
    }

    @injectable()
    class Counter {
      constructor(public foo: Foo) {}

      @state
      count = 0;

      @action
      increase() {
        this.foo.addText(`test${this.count}`);
        this.count += 1;
        this.foo.addText(`test${this.count}`);
        this.count += 1;
        this.foo.addText(`test${this.count}`);
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
    const subscribeFn = jest.fn();
    store.subscribe(subscribeFn);
    counter.increase();
    expect(subscribeFn.mock.calls.length).toBe(1);
    expect(counter.count).toEqual(2);
    expect(counter.foo.textList).toEqual(['test0', 'test1', 'test2']);
  });

  test('across module changing state with error', () => {
    @injectable()
    class Foo {
      name = 'foo';

      @state
      list: number[] = [];

      @action
      addItem(num: number) {
        if (num === 1) {
          // eslint-disable-next-line no-throw-literal
          throw 'something error';
        } else {
          this.list.push(num);
        }
      }
    }

    @injectable()
    class Counter {
      name = 'counter';

      constructor(public foo: Foo) {}

      @state
      count = 0;

      @action
      increase() {
        this.foo.addItem(this.count);
        this.count += 1;
      }

      @action
      increase1() {
        this.foo.addItem(this.count + 1);
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
    const subscribeFn = jest.fn();
    store.subscribe(subscribeFn);
    counter.increase();
    expect(subscribeFn.mock.calls.length).toBe(1);

    expect(() => {
      counter.increase();
    }).toThrowError('something error');
    expect(getStagedState()).toBeUndefined();
    expect(subscribeFn.mock.calls.length).toBe(1);

    counter.increase1();
    expect(subscribeFn.mock.calls.length).toBe(2);
    expect(counter.count).toBe(2);
    expect(counter.foo.list).toEqual([0, 2]);
    expect(store.getState()).toEqual({
      counter: { count: 2 },
      foo: { list: [0, 2] },
    });
  });
});
