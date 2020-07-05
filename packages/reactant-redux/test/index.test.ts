import {
  injectable,
  inject,
  createContainer,
  createStore,
} from 'reactant-module';
import { Dispatch } from 'redux';
import { redux } from '..';

test('base redux with `useValue`', () => {
  const ADD_TODO = 'add';
  const TOGGLE_TODO = 'toggle';

  interface Todo {
    text: string;
    completed: boolean;
  }

  type TodoIndex = number;

  interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Todo;
  }

  interface ToggleTodoAction {
    type: typeof TOGGLE_TODO;
    payload: TodoIndex;
  }

  type TodoAction = AddTodoAction | ToggleTodoAction;

  const todoModel = redux({
    reducers: {
      todoList: (state: Todo[] = [], action: TodoAction) =>
        action.type === 'add' ? [...state, action.payload] : state,
    },
    actions: {
      add: (text: string) => (dispatch: Dispatch<AddTodoAction>) =>
        dispatch({
          type: 'add',
          payload: { text, completed: false },
        }),
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
  expect(Object.values(store.getState())).toEqual([{ todoList: [] }]);
  foo.add('test');
  expect(Object.values(store.getState())).toEqual([
    { todoList: [{ text: 'test', completed: false }] },
  ]);
});

test('base redux with `useFactory`', () => {
  const ADD_TODO = 'add';
  const TOGGLE_TODO = 'toggle';

  interface Todo {
    text: string;
    completed: boolean;
  }

  type TodoIndex = number;

  interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Todo;
  }

  interface ToggleTodoAction {
    type: typeof TOGGLE_TODO;
    payload: TodoIndex;
  }

  type TodoAction = AddTodoAction | ToggleTodoAction;

  @injectable()
  class Bar {
    field = 'bar';
  }

  const todoModel = (bar: Bar) => {
    return redux({
      name: 'todos',
      reducers: {
        todoList: (
          state: Todo[] = [{ text: bar.field, completed: false }],
          action: TodoAction
        ) => (action.type === 'add' ? [...state, action.payload] : state),
      },
      actions: {
        add: (text: string) => (dispatch: Dispatch<AddTodoAction>) =>
          dispatch({
            type: 'add',
            payload: { text, completed: false },
          }),
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
  expect(store.getState()).toEqual({
    todos: { todoList: [{ text: 'bar', completed: false }] },
  });
  foo.add('test');
  expect(store.getState()).toEqual({
    todos: {
      todoList: [
        { text: 'bar', completed: false },
        { text: 'test', completed: false },
      ],
    },
  });
});
