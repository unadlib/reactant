import {
  injectable,
  createState,
  createContainer,
  createStore,
  action,
  ReactantAction,
} from '../..';

test('`createSelector` with type', () => {
  @injectable()
  class Counter {
    state = {
      ...createState({
        count: (_state = 0, _action: ReactantAction) =>
          _action.type === (this as any).name ? _action.state.count : _state,
      }),
    };

    @action
    increase() {
      this.state.count += 1;
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
  expect(counter.state.count).toBe(0);
  counter.increase();
  expect(counter.state.count).toBe(1);
});
