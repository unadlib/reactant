import {
  injectable,
  createContainer,
  dispatch,
  createStore,
  ReactantAction,
  createState,
} from '../..';

test('`dispatch` without action type', () => {
  @injectable()
  class Counter {
    state = {
      count: 0,
    };

    increase() {
      dispatch(this, {
        state: {
          count: this.state.count + 1,
        },
      });
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
  const store = createStore(container, ServiceIdentifiers);
  counter.increase();
  expect(counter.state.count).toBe(1);
  expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
});

test('`dispatch` with action type', () => {
  const type = 'count_increase';

  @injectable()
  class Counter {
    state = {
      ...createState({
        count: (_state = 0, _action: ReactantAction) =>
          _action.type === type ? _action.state.count : _state,
      }),
      sum: 0,
    };

    increase() {
      dispatch(this, {
        type,
        state: {
          count: this.state.count + 1,
        },
      });
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
  const store = createStore(container, ServiceIdentifiers);
  counter.increase();
  expect(counter.state.count).toBe(1);
  expect(Object.values(store.getState())).toEqual([{ count: 1, sum: 0 }]);
});
