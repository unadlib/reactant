/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import {
  injectable,
  inject,
  createContainer,
  createStore,
  ReactantMiddleware,
  PluginModule,
  stateKey,
} from 'reactant-module';
import { applyPatches } from 'immer';
import { model } from '..';

test('base model with `useValue`', () => {
  const todoList: string[] = [];

  const todoModel = model({
    name: 'todo',
    state: {
      todoList,
    },
    actions: {
      add: (todo: string) => (state) => {
        state.todoList.push(todo);
      },
    },
  });

  @injectable()
  class Foo {
    constructor(@inject('todo') public todo: typeof todoModel) {}

    add(todo: string) {
      this.todo.add(todo);
    }

    get todoList() {
      return this.todo.todoList;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Foo, { provide: 'todo', useValue: todoModel }];
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
  expect(Object.values(store.getState())).toEqual([{ todoList: [] }]);
  foo.add('test');
  expect(Object.values(store.getState())).toEqual([{ todoList: ['test'] }]);
});

test('base model with `useFactory`', () => {
  @injectable()
  class Bar {
    field = 'bar';
  }

  const todoList: string[] = [];

  const todoModel = (bar: Bar) => {
    todoList.push(bar.field);
    return model({
      name: 'todos',
      state: {
        todoList,
      },
      actions: {
        add: (todo: string) => (state) => {
          state.todoList.push(todo);
        },
      },
    });
  };

  @injectable()
  class Foo {
    constructor(@inject('todos') public todo: ReturnType<typeof todoModel>) {}

    add(todo: string) {
      this.todo.add(todo);
    }

    get todoList() {
      return this.todo.todoList;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    Foo,
    { provide: 'todos', useFactory: todoModel, deps: [Bar] },
  ];
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
    load: (...args: any[]) => {},
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
  expect(store.getState()).toEqual({
    todos: { todoList: ['bar'] },
  });
  foo.add('test');
  expect(store.getState()).toEqual({
    todos: { todoList: ['bar', 'test'] },
  });
});

test('base model with `useValue` and `enablePatches`', () => {
  const todoList: string[] = [];

  const todoModel = model({
    name: 'todo',
    state: {
      todoList,
    },
    actions: {
      add: (todo: string) => (state) => {
        state.todoList.push(todo);
      },
    },
  });

  @injectable()
  class Foo {
    constructor(@inject('todo') public todo: typeof todoModel) {}

    add(todo: string) {
      this.todo.add(todo);
    }

    get todoList() {
      return this.todo.todoList;
    }
  }

  const actionFn = jest.fn();

  class Logger extends PluginModule {
    middleware: ReactantMiddleware = (store) => (next) => (_action) => {
      actionFn(_action);
      return next(_action);
    };
  }

  const ServiceIdentifiers = new Map();
  const modules = [Foo, { provide: 'todo', useValue: todoModel }, Logger];
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
      enablePatches: true,
    },
  });
  const originalTodoState = foo.todo[stateKey]!;
  expect(Object.values(store.getState())).toEqual([{ todoList: [] }]);
  expect(actionFn.mock.calls.length).toBe(0);
  foo.add('test');
  expect(Object.values(store.getState())).toEqual([{ todoList: ['test'] }]);
  expect(actionFn.mock.calls.length).toBe(1);
  expect(actionFn.mock.calls[0][0]._patches).toEqual([
    {
      op: 'add',
      path: ['todoList', 0],
      value: 'test',
    },
  ]);
  expect(actionFn.mock.calls[0][0]._inversePatches).toEqual([
    {
      op: 'replace',
      path: ['todoList', 'length'],
      value: 0,
    },
  ]);
  expect(
    applyPatches(originalTodoState, actionFn.mock.calls[0][0]._patches)
  ).toEqual(foo.todo[stateKey]);
  expect(
    applyPatches(originalTodoState, actionFn.mock.calls[0][0]._patches) ===
      foo.todo[stateKey]
  ).toBe(false);
  expect(
    applyPatches(foo.todo[stateKey]!, actionFn.mock.calls[0][0]._inversePatches)
  ).toEqual(originalTodoState);
});
