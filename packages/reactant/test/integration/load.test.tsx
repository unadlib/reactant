import {
  createApp,
  injectable,
  action,
  state,
  load,
  ModuleRef,
  optional,
  ModuleOptions,
} from '../..';

test('base `load`', async () => {
  @injectable()
  class Counter {
    constructor(
      @optional('todo') public todo: ITodo,
      public moduleRef: ModuleRef
    ) {}

    loadTodoModule<T extends ITodo>(main: ModuleOptions<T>) {
      load(this, { main }, (todo) => {
        this.todo = todo;
      });
    }

    get todoModule() {
      return this.moduleRef.get('todo');
    }

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
  expect(app.instance.todo).toBeUndefined();
  app.instance.loadTodoModule({ provide: 'todo', useClass: Todo });
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todoModule).toBe(app.instance.todo);
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    {
      list: [],
    },
  ]);
});
