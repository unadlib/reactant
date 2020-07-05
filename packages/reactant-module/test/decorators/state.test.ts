import { injectable, createContainer, createStore, action, state } from '../..';

describe('@state', () => {
  test('base', () => {
    @injectable()
    class Counter {
      @state
      count = 0;

      @action
      increase() {
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
      }
    );
    expect(counter.count).toBe(0);
    expect(Object.values(store.getState())).toEqual([{ count: 0 }]);
    counter.increase();
    expect(counter.count).toBe(1);
  });

  test('inheritance', () => {
    @injectable()
    class BaseCounter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    @injectable()
    class Counter extends BaseCounter {
      @state
      count = 10;
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
    expect(counter.count).toBe(10);
    counter.increase();
    expect(counter.count).toBe(11);
  });
});
