/* eslint-disable no-promise-executor-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { Storage, StorageOptions, IStorageOptions } from 'reactant-storage';
import { unmountComponentAtNode, render } from 'reactant-web';
import { act } from 'react-dom/test-utils';
import {
  createApp,
  injectable,
  action,
  state,
  load,
  ModuleOptions,
  lazy,
  ViewModule,
} from '../..';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

test('base `lazy`', async () => {
  @injectable()
  class Counter extends ViewModule {
    loadTodoModule<T extends ITodo>(module: ModuleOptions<T>) {
      return load(this, [module]);
    }

    @lazy('todo')
    todo?: Todo;

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    component() {
      return null;
    }
  }

  const storage = {
    data: {} as Record<string, any>,
    getItem(key: string): Promise<string> {
      return new Promise((resolve) => {
        resolve(this.data[key]);
      });
    },
    setItem(key: string, item: string): Promise<void> {
      return new Promise((resolve) => {
        this.data[key] = item;
        resolve();
      });
    },
    removeItem(key: string): Promise<void> {
      return new Promise((resolve) => {
        delete this.data[key];
        resolve();
      });
    },
  };

  const app = createApp({
    modules: [
      Storage,
      {
        provide: StorageOptions,
        useValue: {
          storage,
          blacklist: [],
        } as IStorageOptions,
      },
    ],
    main: Counter,
    render,
  });

  act(() => {
    app.bootstrap(container);
  });

  interface ITodo {
    list: string[];
    add(text: string): void;
  }

  @injectable()
  class Todo implements ITodo {
    @state
    list: string[] = [];

    @action
    add(text: string) {
      this.list.push(text);
    }
  }

  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    { rehydrated: false, version: -1 },
  ]);
  expect(app.instance.todo).toBeNull();
  await app.instance.loadTodoModule({ provide: 'todo', useClass: Todo });
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todo).toBe(app.instance.todo);
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    {
      list: [],
    },
    { rehydrated: false, version: -1 },
  ]);
});

test('base `lazy` with cache', async () => {
  @injectable()
  class Counter {
    loadTodoModule<T extends Todo>(module: ModuleOptions<T>) {
      return load(this, [module]);
    }

    @lazy('todo')
    todo?: Todo;

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }
  }

  const app = createApp({
    main: Counter,
    render: () => {
      //
    },
  });

  @injectable()
  class Todo {}

  await app.instance.loadTodoModule({ provide: 'todo', useClass: Todo });
  expect(app.instance.todo).toBeInstanceOf(Todo);
  const todo = new Todo();
  app.instance.todo = todo;
  expect(app.instance.todo === todo).toBeTruthy();
});

test('base `lazy` without cache', async () => {
  @injectable()
  class Foobar {}
  @injectable()
  class Counter {
    async loadTodoModule<T extends Todo>(module: ModuleOptions<T>) {
      await new Promise((resolve) => setTimeout(resolve));
      await load(this, [module]);
    }

    @lazy('todo', false)
    todo?: Todo;

    @lazy(Foobar)
    fooBar?: Foobar;

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }
  }

  const app = createApp({
    modules: [Foobar],
    main: Counter,
    render: () => {
      //
    },
  });

  expect(app.instance.fooBar).toBeInstanceOf(Foobar);

  @injectable()
  class Todo {}

  await app.instance.loadTodoModule({ provide: 'todo', useClass: Todo });
  expect(app.instance.todo).toBeInstanceOf(Todo);
  const todo = new Todo();
  const oldTodo = app.instance.todo;
  app.instance.todo = todo;
  expect(app.instance.todo === todo).toBeFalsy();
  expect(app.instance.todo === oldTodo).toBeTruthy();
});
