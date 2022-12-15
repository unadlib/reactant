import { compose } from 'redux';
import {
  injectable,
  createContainer,
  createStore,
  action,
  state,
  inject,
} from '../..';

test('base module for reduxDevToolsCompose', () => {
  const fn = jest.fn(() => compose);
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = fn;

  @injectable()
  class Todos {
    @state
    list = [];
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
  const ServiceIdentifiers = new Map();
  const modules = [
    Counter,
    Todos,
    { provide: 'string', useValue: 'test' },
    { provide: 'number', useValue: 42 },
    { provide: 'symbol', useValue: Symbol('test') },
    { provide: 'null', useValue: null },
    { provide: 'undefined', useValue: undefined },
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
      reduxDevTools: true,
      reduxDevToolsOptions: {
        name: 'test',
      },
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
  expect(fn.mock.calls.length).toBe(1);
  expect(JSON.parse(JSON.stringify(fn.mock.calls, null, 2))).toEqual([
    [
      {
        serialize: true,
        name: 'test',
      },
    ],
  ]);
  const args: any[] = fn.mock.calls[0];
  expect(
    args[0].actionSanitizer({
      _reactant: 'REACTANT_ACTION',
      foo: 'foo',
      type: 'type',
      method: 'method',
    })
  ).toEqual({
    _reactant: 'REACTANT_ACTION',
    foo: 'foo',
    type: '@@reactant/type/method',
    method: 'method',
  });
  expect(
    args[0].actionSanitizer({
      foo: 'foo',
      type: 'type',
      method: 'method',
    })
  ).toEqual({
    foo: 'foo',
    type: 'type',
    method: 'method',
  });
});

test('base module with error for reduxDevToolsCompose', () => {
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => {
    throw new Error(``);
  };

  @injectable()
  class Todos {
    @state
    list = [];
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
  const ServiceIdentifiers = new Map();
  const modules = [
    Counter,
    Todos,
    { provide: 'string', useValue: 'test' },
    { provide: 'number', useValue: 42 },
    { provide: 'symbol', useValue: Symbol('test') },
    { provide: 'null', useValue: null },
    { provide: 'undefined', useValue: undefined },
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
      reduxDevTools: true,
      reduxDevToolsOptions: {
        name: 'test',
      },
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
});
