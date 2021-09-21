import { applyPatches } from 'immer';
import { Middleware } from 'redux';
import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  getStagedState,
  enablePatchesKey,
  applyMiddleware,
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
    expect((counter as any)[enablePatchesKey]).toBe(false);
    expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
  });

  test('enable `autoFreeze` in devOptions', () => {
    @injectable({
      name: 'counter',
    })
    class Counter {
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
      (...args: any[]) => {
        //
      },
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
    @injectable({
      name: 'foo0',
    })
    class Foo0 {
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

    @injectable({
      name: 'foo',
    })
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
      (...args: any[]) => {
        //
      },
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
      (...args: any[]) => {
        //
      },
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
    @injectable({
      name: 'foo',
    })
    class Foo {
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

    @injectable({
      name: 'counter',
    })
    class Counter {
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
      (...args: any[]) => {
        //
      },
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

  test('base with `enablePatches`', () => {
    interface Todo {
      text: string;
    }
    @injectable({
      name: 'todo',
    })
    class TodoList {
      @state
      list: Todo[] = [
        {
          text: 'foo',
        },
      ];

      @action
      add(text: string) {
        this.list.slice(-1)[0].text = text;
        this.list.push({ text });
      }
    }

    const actionFn = jest.fn();

    const middleware: Middleware = (store) => (next) => (_action) => {
      actionFn(_action);
      return next(_action);
    };

    const ServiceIdentifiers = new Map();
    const modules = [TodoList, applyMiddleware(middleware)];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    const todoList = container.get(TodoList);
    const store = createStore(
      modules,
      container,
      ServiceIdentifiers,
      new Set(),
      (...args: any[]) => {
        //
      },
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
      {
        enablePatches: true,
      }
    );
    const originalTodoState = store.getState();
    expect(Object.values(store.getState())).toEqual([
      { list: [{ text: 'foo' }] },
    ]);
    expect(actionFn.mock.calls.length).toBe(0);
    todoList.add('test');
    expect(Object.values(store.getState())).toEqual([
      { list: [{ text: 'test' }, { text: 'test' }] },
    ]);
    expect(actionFn.mock.calls.length).toBe(1);
    expect(actionFn.mock.calls[0][0]._patches).toEqual([
      {
        op: 'replace',
        path: ['todo', 'list', 0, 'text'],
        value: 'test',
      },
      {
        op: 'add',
        path: ['todo', 'list', 1],
        value: {
          text: 'test',
        },
      },
    ]);
    expect(actionFn.mock.calls[0][0]._inversePatches).toEqual([
      {
        op: 'replace',
        path: ['todo', 'list', 0, 'text'],
        value: 'foo',
      },
      {
        op: 'replace',
        path: ['todo', 'list', 'length'],
        value: 1,
      },
    ]);
    expect(
      applyPatches(originalTodoState, actionFn.mock.calls[0][0]._patches)
    ).toEqual(store.getState());
    expect(
      applyPatches(originalTodoState, actionFn.mock.calls[0][0]._patches) ===
        store.getState()
    ).toBe(false);
    expect(
      applyPatches(store.getState(), actionFn.mock.calls[0][0]._inversePatches)
    ).toEqual(originalTodoState);
  });
});
