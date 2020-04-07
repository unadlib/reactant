import { Middleware } from 'redux';
import {
  injectable,
  createContainer,
  createStore,
  state,
  action,
  PluginModule,
} from '../..';

test('`createStore` with base pararms', () => {
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
  const store = createStore(container, ServiceIdentifiers);
  expect(Object.values(store.getState())).toEqual([{ count: 0 }]);
});

test('`createStore` with base preloadedState pararms', () => {
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
  const store = createStore(container, ServiceIdentifiers, {
    counter: { count: 18 },
  });
  expect(Object.values(store.getState())).toEqual([{ count: 18 }]);
});

test('`createStore` with base middlewares pararms', () => {
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
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const couter = container.get(Counter);
  const actionFn = jest.fn();
  const logger: Middleware = store => next => _action => {
    actionFn(_action);
    const result = next(_action);
    actionFn(store.getState());
    return result;
  };
  const store = createStore(container, ServiceIdentifiers, undefined, [logger]);
  couter.increase();
  expect(actionFn.mock.calls.length).toBe(2);
  expect(actionFn.mock.calls[0]).toEqual([
    {
      _reactant: true,
      method: 'increase',
      state: { count: 1 },
      type: 'counter',
    },
  ]);
  expect(actionFn.mock.calls[1]).toEqual([{ counter: { count: 1 } }]);
});

test('`createStore` with base providers pararms', () => {
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
    container,
    ServiceIdentifiers,
    undefined,
    undefined,
    providers
  );
  expect(providers.length).toBe(1);
  expect(providers[0]({}) === null).toBeTruthy();
});

test('`createStore` with base devOptions pararms', () => {
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
  const couter = container.get(Counter);
  const store = createStore(
    container,
    ServiceIdentifiers,
    undefined,
    undefined,
    undefined,
    { autoFreeze: true }
  );
  expect(() => {
    store.getState().counter.sum.count = 1;
  }).toThrowError(/Cannot assign to read only property/);
  couter.increase();
  for (const fn of [
    () => {
      store.getState().counter.sum.count = 1;
    },
    () => couter.increase1(),
    () => couter.increase2(),
  ]) {
    expect(fn).toThrowError(/Cannot assign to read only property/);
  }
});
