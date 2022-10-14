import {
  injectable,
  multiInject,
  createContainer,
  createStore,
  action,
  state,
  computed,
  inject,
  ModuleRef,
  initStateKey,
} from '..';

test('base module with @state and @action', () => {
  @injectable()
  class Todos {
    @state
    list: string[] = [];
  }

  @injectable()
  class Counter {
    constructor(@inject('string') public string: string) {}

    @state
    count = 0;

    @state
    others = {
      list: [] as number[],
    };

    @action
    increase() {
      this.count += 1;
    }

    @action
    add() {
      this.others.list.push(this.others.list.length);
    }
  }

  @injectable()
  class Foo {
    constructor(public moduleRef: ModuleRef) {
      const foolist = this.moduleRef.get(Todos).list;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    Counter,
    Todos,
    { provide: 'string', useValue: 'test' },
    { provide: 'number', useValue: 42 },
    { provide: 'symbol', useValue: Symbol('test') },
    { provide: 'null', useValue: null },
    { provide: 'undefined', useValue: undefined },
    Foo,
  ];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
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
  expect(counter.count).toBe(0);
  expect(counter.string).toBe('test');
  expect(Object.values(store.getState())).toEqual([
    { count: 0, others: { list: [] } },
    { list: [] },
  ]);
  counter.increase();
  expect(counter.count).toBe(1);
  counter.add();
  expect(counter.others.list).toEqual([0]);
  expect(Object.values(store.getState())).toEqual([
    { count: 1, others: { list: [0] } },
    { list: [] },
  ]);
  expect((counter as any)[initStateKey].count).toBe(0);
});

test('base module with ModuleRef', () => {
  @injectable()
  class Todos {
    @state
    list: string[] = [];

    @action
    add(todo: string) {
      this.list.push(todo);
    }
  }

  @injectable()
  class Foo {
    list = this.moduleRef.get(Todos).list;

    constructor(public moduleRef: ModuleRef) {
      this.list.push('coding');
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Todos, Foo];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const todos = container.get(Todos);
  expect(() => {
    todos.add('testing');
  }).toThrowError();
  todos.list.push('reading');
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
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
      autoFreeze: false,
    },
  });
  expect(Object.values(store.getState())).toEqual([
    { list: ['reading', 'coding'] },
  ]);
  todos.add('testing');
  expect(Object.values(store.getState())).toEqual([
    { list: ['reading', 'coding', 'testing'] },
  ]);
});

test('module with multiple module injection with same module or others', () => {
  const computedFn = jest.fn();
  @injectable({
    name: 'foo',
  })
  class Foo {
    @state
    count = 1;

    @action
    increase() {
      this.count += 1;
    }

    @computed(({ count }: Foo) => [count])
    get num() {
      computedFn();
      return this.count + 1;
    }
  }

  @injectable({
    name: 'fooTest',
  })
  class FooTest {
    @state
    count = 1;
  }

  @injectable()
  class FooBar {
    constructor(
      @multiInject('FooIdentifier') public foos: Foo[],
      public foo: Foo
    ) {}
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    FooBar,
    { provide: 'FooIdentifier', useClass: Foo },
    { provide: 'FooIdentifier', useClass: Foo },
    { provide: 'FooIdentifier', useClass: FooTest },
  ];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const fooBar = container.get(FooBar);
  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules: new Set(),
    load: (...args: any[]) => {
      //
    },
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
    foo: { count: 1 },
    'foo:0': { count: 1 },
    'foo:1': { count: 1 },
    'fooTest:2': { count: 1 },
  });
  fooBar.foos[0].increase();
  expect(store.getState()).toEqual({
    foo: { count: 1 },
    'foo:0': { count: 2 },
    'foo:1': { count: 1 },
    'fooTest:2': { count: 1 },
  });
  fooBar.foos[1].increase();
  expect(store.getState()).toEqual({
    foo: { count: 1 },
    'foo:0': { count: 2 },
    'foo:1': { count: 2 },
    'fooTest:2': { count: 1 },
  });
  expect(fooBar.foos[1].num).toBe(3);
  expect(fooBar.foos[0].num).toBe(3);
  expect(computedFn.mock.calls.length).toBe(2);
  fooBar.foos[1].increase();
  expect(fooBar.foos[1].num).toBe(4);
  expect(fooBar.foos[0].num).toBe(3);
  expect(computedFn.mock.calls.length).toBe(3);
});

test('Unexpected multi-inject: module with multiple module injection with same module or others', () => {
  const computedFn = jest.fn();
  @injectable({
    name: 'foo',
  })
  class Foo {
    @state
    count = 1;

    @action
    increase() {
      this.count += 1;
    }

    @computed(({ count }: Foo) => [count])
    get num() {
      computedFn();
      return this.count + 1;
    }
  }

  @injectable({
    name: 'fooTest',
  })
  class FooTest {
    @state
    count = 1;
  }

  @injectable()
  class FooBar {
    constructor(@inject('FooIdentifier') public foos: Foo, public foo: Foo) {}
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    FooBar,
    { provide: 'FooIdentifier', useClass: Foo },
    { provide: 'FooIdentifier', useClass: Foo },
    { provide: 'FooIdentifier', useClass: FooTest },
  ];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  expect(() => {
    container.get(FooBar);
  }).toThrowErrorMatchingSnapshot();
});
