import {
  injectable,
  createState,
  createContainer,
  createStore,
  action,
  state,
  ReactantAction,
} from '../..';

test('`createState` with type', () => {
  @injectable()
  class Counter {
    @state
    count = createState<number, ReactantAction>(($state = 0) => $state);

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
  counter.increase();
  expect(counter.count).toBe(1);
});
