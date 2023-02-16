/* eslint-disable no-use-before-define */
import {
  createApp,
  injectable,
  action,
  state,
  load,
  ModuleRef,
  dynamic,
} from '../..';

test('base `dynamic` use name by default', async () => {
  @injectable()
  class Counter {
    constructor(public moduleRef: ModuleRef) {}

    @dynamic('todoModule')
    readonly todo?: ITodo;

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    get _todo() {
      return this.moduleRef.get<ITodo>('todo');
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

  @injectable({
    name: 'todoModule',
  })
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
  expect(() => {
    // eslint-disable-next-line no-unused-expressions
    app.instance._todo;
  }).toThrowError(`No matching bindings found for serviceIdentifier: todo`);
  await load(app.instance, [{ provide: 'todo', useClass: Todo }]);
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    { list: [] },
  ]);
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todo).toBe(app.instance._todo);
});

test('base `dynamic` use token', async () => {
  @injectable()
  class Counter {
    constructor(public moduleRef: ModuleRef) {}

    @dynamic('todo', { useToken: true })
    todo?: ITodo;

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    get _todo() {
      return this.moduleRef.get<ITodo>('todo');
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
  expect(() => {
    // eslint-disable-next-line no-unused-expressions
    app.instance._todo;
  }).toThrowError(`No matching bindings found for serviceIdentifier: todo`);
  await load(app.instance, [{ provide: 'todo', useClass: Todo }]);
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    { list: [] },
  ]);
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todo).toBe(app.instance._todo);
});

test('base `dynamic` with multi-modules', async () => {
  @injectable()
  class Counter {
    @dynamic('todo', { multiple: true, useToken: true })
    todo?: ITodo[];

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
  await load(app.instance, [{ provide: 'todo', useClass: Todo }]);
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    { list: [] },
  ]);
  expect(app.instance.todo!.length).toBe(1);
  expect(app.instance.todo![0]).toBeInstanceOf(Todo);
  app.instance.todo![0].add('test');
  expect(app.instance.todo![0].list).toEqual(['test']);
  await load(app.instance, [{ provide: 'todo', useClass: Todo }]);
  expect(app.instance.todo!.length).toBe(2);
  expect(app.instance.todo![1]).toBeInstanceOf(Todo);
  expect(app.instance.todo![0].list).toEqual(['test']);
  expect(app.instance.todo![1].list).toEqual([]);
});
