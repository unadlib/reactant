import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  autobind,
} from '../..';

test('base `@autobind` decorate', () => {
  @injectable()
  class Counter {
    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    @autobind
    @action
    decrease() {
      this.count -= 1;
    }

    @autobind
    run() {
      this.increase();
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
  const { increase, run, decrease } = counter;
  expect(counter.count).toBe(0);
  expect(() => {
    increase();
  }).toThrowError();
  expect(counter.count).toBe(0);
  run();
  expect(counter.count).toBe(1);
  decrease();
  expect(counter.count).toBe(0);
});

test('`@autobind` decorate about inheritance', () => {
  @injectable()
  class BaseCounter {
    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    @autobind
    @action
    decrease() {
      this.count -= 1;
    }

    @autobind
    run() {
      this.increase();
    }
  }

  @injectable()
  class Counter extends BaseCounter {
    @autobind
    decrease() {
      super.decrease();
    }

    @autobind
    run() {
      super.run();
      this.increase();
      this.decrease();
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
  const { run, decrease } = counter;
  expect(counter.count).toBe(0);
  decrease();
  expect(counter.count).toBe(-1);
  run();
  expect(counter.count).toBe(0);
});

test('`@autobind` decorate error', () => {
  expect(() => {
    @injectable()
    class Counter {
      @state
      count = 0;

      // decorate error
      @action
      @autobind
      errorDecrease() {
        this.count -= 1;
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
  }).toThrowError(/only be decorated by '@action' as a class method/);
});
