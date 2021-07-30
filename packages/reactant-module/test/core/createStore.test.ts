import { Middleware } from 'redux';
import {
  injectable,
  createContainer,
  createStore,
  state,
  action,
  PluginModule,
  actionIdentifier,
} from '../..';

describe('createStore', () => {
  test('basic parameters', () => {
    @injectable()
    class Counter {
      @state
      count = 0;
    }
    const ServiceIdentifiers = new Map();
    const modules = [Counter];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    container.get(Counter);
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
    expect(Object.values(store.getState())).toEqual([{ count: 0 }]);
  });

  test('preloadedState', () => {
    @injectable()
    class Counter {
      name = 'counter';

      @state
      count = 0;
    }
    const ServiceIdentifiers = new Map();
    const modules = [Counter];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    container.get(Counter);
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
      },
      {
        counter: { count: 18 },
      }
    );
    expect(Object.values(store.getState())).toEqual([{ count: 18 }]);
  });

  test('middleware module', () => {
    @injectable()
    class Counter {
      name = 'counter';

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }
    const actionFn = jest.fn();
    class Logger extends PluginModule {
      middleware: Middleware = (store) => (next) => (_action) => {
        actionFn(_action);
        const result = next(_action);
        actionFn(store.getState());
        return result;
      };
    }

    const ServiceIdentifiers = new Map();
    const modules = [Counter, Logger];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    const counter = container.get(Counter);
    createStore(
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
    counter.increase();
    expect(actionFn.mock.calls.length).toBe(2);
    expect(actionFn.mock.calls[0]).toEqual([
      {
        _reactant: actionIdentifier,
        method: 'increase',
        params: [],
        state: {
          counter: { count: 1 },
        },
        type: 'counter',
      },
    ]);
    expect(actionFn.mock.calls[1]).toEqual([{ counter: { count: 1 } }]);
  });

  test('providers', () => {
    const Provider = () => null;

    @injectable()
    class CounterPlugin extends PluginModule {
      provider = Provider;
    }

    @injectable()
    class Counter {
      constructor(public counterPlugin: CounterPlugin) {}

      state = {
        count: 0,
      };
    }
    const ServiceIdentifiers = new Map();
    const modules = [Counter];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    container.get(Counter);
    const providers: React.FunctionComponent[] = [];
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
        provider: providers,
      }
    );
    expect(providers.length).toBe(1);
    expect(providers[0]({}) === null).toBeTruthy();
  });

  test('providers - be depended on', () => {
    const fooProvider = () => null;
    const barProvider = () => null;

    @injectable()
    class FooPlugin extends PluginModule {
      provider = fooProvider;
    }

    @injectable()
    class BarPlugin extends PluginModule {
      provider = barProvider;
    }

    @injectable()
    class Counter {}
    const ServiceIdentifiers = new Map();
    const modules = [Counter, FooPlugin, BarPlugin];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    container.get(Counter);
    const providers: React.FunctionComponent[] = [];
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
        provider: providers,
      }
    );
    expect(providers.map(({ name }) => name)).toEqual(
      [fooProvider, barProvider].map(({ name }) => `bound ${name}`)
    );
  });

  test('devOptions', () => {
    @injectable()
    class Counter {
      name = 'counter';

      @state
      count = 0;

      @state
      sum = { count: 0 };

      @action
      increase() {
        this.sum.count += 1;
      }

      increase1() {
        this.sum.count += 1;
      }

      increase2() {
        this.count += 1;
      }
    }
    const ServiceIdentifiers = new Map();
    const modules = [Counter];
    const container = createContainer({
      ServiceIdentifiers,
      modules,
      options: {
        defaultScope: 'Singleton',
      },
    });
    const counter = container.get(Counter);
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
      },
      undefined,
      { autoFreeze: true }
    );
    expect(() => {
      store.getState().counter.sum.count = 1;
    }).toThrowError(/Cannot assign to read only property/);
    counter.increase();
    for (const fn of [
      () => {
        store.getState().counter.sum.count = 1;
      },
      () => counter.increase1(),
      () => counter.increase2(),
    ]) {
      expect(fn).toThrowError(/Cannot assign to read only property/);
    }
  });
});
