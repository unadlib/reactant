import {
  injectable,
  createContainer,
  createStore,
  action,
  state,
  createState,
  ReactantAction,
} from '../..';

test('base `@state`', () => {
  @injectable()
  class Counter {
    @state
    count1 = 0;

    @state
    others = {
      list: [] as number[],
    };

    @state
    count = createState<number, ReactantAction>((_state = 0, _action) =>
      _action.type === (this as any).name ? _action.state.count : _state
    );

    @action
    increase() {
      this.count += 1;
    }

    @action
    increase1() {
      this.count1 += 1;
    }

    @action
    add() {
      this.others.list.push(this.others.list.length);
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
  expect(counter.count).toBe(0);
  expect(Object.values(store.getState())).toEqual([
    { count: 0, count1: 0, others: { list: [] } },
  ]);
  counter.increase();
  expect(counter.count).toBe(1);
  counter.add();
  expect(counter.others.list).toEqual([0]);
  expect(Object.values(store.getState())).toEqual([
    { count: 1, count1: 0, others: { list: [0] } },
  ]);
  counter.increase1();
  expect(counter.count1).toBe(1);
});

test('`@state` about inheritance', () => {
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
  const store = createStore(container, ServiceIdentifiers);
  expect(counter.count).toBe(10);
  counter.increase();
  expect(counter.count).toBe(11);
});
