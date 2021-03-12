import {
  createApp,
  injectable,
  action,
  state,
  load,
  ModuleOptions,
  lazy,
} from '../..';

test('base `lazy`', async () => {
  @injectable()
  class Counter {
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
  }

  const app = createApp({
    main: Counter,
    render: () => {
      //
    },
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

  expect(Object.values(app.store?.getState())).toEqual([{ count: 0 }]);
  expect(app.instance.todo).toBeNull();
  await app.instance.loadTodoModule({ provide: 'todo', useClass: Todo });
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todo).toBe(app.instance.todo);
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    {
      list: [],
    },
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
    loadTodoModule<T extends Todo>(module: ModuleOptions<T>) {
      return load(this, [module]);
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
