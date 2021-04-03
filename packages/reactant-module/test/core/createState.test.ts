import {
  injectable,
  createState,
  createContainer,
  createStore,
  action,
  state,
  ReactantAction,
  identifierKey,
  Service,
} from '../..';

test('`createState` with type', () => {
  @injectable()
  class Counter {
    @state
    count = createState<number, ReactantAction>((_state = 0, _action) =>
      _action.type === (this as any)[identifierKey]
        ? _action.state[(this as any)[identifierKey]!].count
        : _state
    );

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
