import {
  injectable,
  createContainer,
  createStore,
  action,
  state,
  inject,
  ModuleRef,
  initStateKey,
  getRef,
} from '../..';

test('getRef for base module', () => {
  @injectable()
  class Todos {
    @state
    list: string[] = [];
  }

  @injectable({
    name: 'counter',
  })
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
    {
      provide: 'function',
      useValue: () => {
        //
      },
    },
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
  expect(getRef(counter).initState!).toBeUndefined();
  expect(getRef(counter).container).toBeUndefined();
  expect(getRef(counter).store).toBeUndefined();
  expect(getRef(counter).state).toEqual({
    count: undefined,
    others: undefined,
  });
  expect(getRef(counter).identifier).toBeUndefined();
  expect(getRef(counter).initState).toBeUndefined();
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
  expect(getRef(counter).initState!.count).toBe(0);
  expect(getRef(counter).container).toBe(container);
  expect(getRef(counter).store).toBe(store);
  expect(getRef(counter).identifier).toBe('counter');
  expect(getRef(counter).state).toBe(store.getState().counter);
  expect(getRef(counter).initState).toEqual({ count: 0, others: { list: [] } });
  expect(
    Object.keys(getRef(counter).modules!).filter(
      (name) => !/^@@reactant/.test(name)
    )
  ).toEqual([
    'counter',
    'string',
    'number',
    'symbol',
    'null',
    'undefined',
    'function',
  ]);
});
