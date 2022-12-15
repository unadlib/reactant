/* eslint-disable no-use-before-define */
import {
  createApp,
  injectable,
  action,
  state,
  load,
  ModuleRef,
  optional,
  ModuleOptions,
  inject,
  ClassProvider,
  multiInject,
  multiOptional,
} from '../..';

test('base `load`', async () => {
  @injectable()
  class Counter {
    constructor(
      @optional('todo') public todo: ITodo,
      public moduleRef: ModuleRef
    ) {}

    async loadTodoModule<T extends ITodo>(module: ClassProvider<T>) {
      const container = await load(this, [module]);
      this.todo = container.get(module.provide);
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
  await app.instance.loadTodoModule({ provide: 'todo', useClass: Todo });
  expect(Object.values(app.store?.getState())).toEqual([
    { count: 0 },
    { list: [] },
  ]);
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todoModule).toBe(app.instance.todo);
});

test('base `load` with multi-modules', async () => {
  @injectable({
    name: 'Counter0',
  })
  class Counter0 {
    @state
    count0 = 0;
  }

  @injectable()
  class Counter {
    constructor(
      @inject('Counter0') public counter0: Counter0,
      @optional('todo') public todo: ITodo,
      @optional('todo1') public todo1: ITodo,
      public moduleRef: ModuleRef
    ) {}

    async loadTodoModule(modules: ModuleOptions[] = []) {
      const container = await load(this, modules);
      this.todo = container.get('todo');
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

  @injectable({
    name: 'Counter1',
  })
  class Counter1 {
    @state
    count1 = 0;
  }

  @injectable({
    name: 'Counter2',
  })
  class Counter2 {
    constructor(public counter1: Counter1) {}

    @state
    count2 = 0;
  }

  interface ITodo {
    list: string[];
    add(text: string): void;
    counter1: Counter1;
    counter2: Counter2;
  }

  @injectable()
  class Todo implements ITodo {
    constructor(
      public counter1: Counter1,
      @inject('counter2token') public counter2: Counter2
    ) {}

    @state
    list: string[] = [];

    @action
    add(text: string) {
      this.list.push(text);
    }
  }

  const app = createApp({
    modules: [{ provide: 'Counter0', useClass: Counter0 }],
    main: Counter,
    render: () => {
      //
    },
  });

  expect(Object.values(app.store?.getState())).toEqual([
    { count0: 0 },
    { count: 0 },
  ]);
  expect(app.instance.todo).toBeUndefined();
  await app.instance.loadTodoModule([
    { provide: 'todo', useClass: Todo },
    { provide: 'counter2token', useClass: Counter2 },
  ]);
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todoModule).toBe(app.instance.todo);
  expect(Object.values(app.store?.getState())).toEqual([
    { count0: 0 },
    { count: 0 },
    {
      list: [],
    },
    { count2: 0 },
    { count1: 0 },
  ]);
  expect(app.instance.todo.counter2.counter1).toBeInstanceOf(Counter1);
});

test('base `load` with multi-modules and multi injection', async () => {
  @injectable({
    name: 'Counter0',
  })
  class Counter0 {
    @state
    count0 = 0;
  }

  @injectable({
    name: 'Counter3',
  })
  class Counter3 {
    @state
    count3 = 0;
  }

  @injectable({
    name: 'Counter4',
  })
  class Counter4 {
    @state
    count4 = 0;
  }

  @injectable({
    name: 'Counter5',
  })
  class Counter5 {
    @state
    count5 = 0;
  }

  @injectable()
  class Counter {
    constructor(
      @inject('Counter0') public counter0: Counter0,
      @inject('Counter3') public counter3: Counter3,
      @multiInject('Counter4') public counter4: Counter4[],
      public moduleRef: ModuleRef,
      @optional('todo') public todo?: ITodo,
      @optional('todo1') public todo1?: ITodo,
      @multiOptional('Counter5') public counter5?: Counter5[]
    ) {}

    async loadTodoModule(modules: ModuleOptions[] = []) {
      const container = await load(this, modules);
      this.todo = container.get('todo');
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

  @injectable({
    name: 'Counter1',
  })
  class Counter1 {
    @state
    count1 = 0;
  }

  @injectable({
    name: 'Counter2',
  })
  class Counter2 {
    constructor(public counter1: Counter1) {}

    @state
    count2 = 0;
  }

  interface ITodo {
    list: string[];
    add(text: string): void;
    counter1: Counter1;
    counter2: Counter2;
  }

  @injectable()
  class Todo implements ITodo {
    constructor(
      public counter1: Counter1,
      @inject('counter2token') public counter2: Counter2
    ) {}

    @state
    list: string[] = [];

    @action
    add(text: string) {
      this.list.push(text);
    }
  }

  const app = createApp({
    modules: [
      { provide: 'Counter0', useClass: Counter0 },
      { provide: 'Counter3', useClass: Counter3 },
      { provide: 'Counter4', useClass: Counter4 },
      { provide: 'Counter5', useClass: Counter5 },
    ],
    main: Counter,
    render: () => {
      //
    },
  });

  expect(Object.values(app.store?.getState())).toEqual([
    { count0: 0 },
    { count3: 0 },
    { count4: 0 },
    { count5: 0 },
    { count: 0 },
  ]);
  expect(app.instance.todo).toBeUndefined();
  await app.instance.loadTodoModule([
    { provide: 'todo', useClass: Todo },
    { provide: 'Counter3', useClass: Counter3 },
    { provide: 'counter2token', useClass: Counter2 },
    { provide: 'Counter4', useClass: Counter4 },
    { provide: 'Counter5', useClass: Counter5 },
  ]);
  expect(app.instance.todo).toBeInstanceOf(Todo);
  expect(app.instance.todoModule).toBe(app.instance.todo);
  expect(Object.values(app.store?.getState())).toEqual([
    { count0: 0 },
    { count3: 0 },
    { count4: 0 },
    { count5: 0 },
    { count: 0 },
    { count4: 0 },
    { count5: 0 },
    {
      list: [],
    },
    { count2: 0 },
    { count1: 0 },
  ]);
  expect(app.instance.todo!.counter2.counter1).toBeInstanceOf(Counter1);
});
