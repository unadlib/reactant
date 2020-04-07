import {
  injectable,
  createContainer,
  createStore,
  action,
  state,
  createSelector,
} from '../..';

test('`createSelector` without an external checked value or with an external checked value', () => {
  const computeCount = jest.fn();

  @injectable()
  class Counter {
    @state
    count = 0;

    @state
    others = {
      list: [] as number[],
      count: 0,
    };

    @action
    increase() {
      this.count += 1;
    }

    @action
    decrease() {
      this.others.count -= 1;
    }

    @action
    add() {
      this.others.list.push(this.others.list.length + 1);
    }

    getSum = createSelector(
      () => this.count,
      () => this.others.list,
      (count, list) => {
        computeCount();
        return list.reduce((sum, item) => sum + item, count);
      }
    );
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
  createStore(container, ServiceIdentifiers);
  expect(computeCount.mock.calls.length).toBe(0);
  expect(counter.getSum()).toBe(0);
  expect(computeCount.mock.calls.length).toBe(1);
  expect(counter.getSum()).toBe(0);
  expect(counter.getSum()).toBe(0);
  expect(computeCount.mock.calls.length).toBe(1);
  counter.increase();
  expect(counter.getSum()).toBe(1);
  expect(computeCount.mock.calls.length).toBe(2);
  counter.add();
  expect(counter.getSum()).toBe(2);
  expect(computeCount.mock.calls.length).toBe(3);
  counter.decrease();
  expect(counter.getSum()).toBe(2);
  expect(counter.getSum()).toBe(2);
  expect(computeCount.mock.calls.length).toBe(3);
  const checkedValue = {};
  counter.add();
  expect(counter.getSum(checkedValue)).toBe(4);
  expect(computeCount.mock.calls.length).toBe(4);
  counter.add();
  expect(counter.getSum(checkedValue)).toBe(4);
  expect(computeCount.mock.calls.length).toBe(4);
  // check new value
  expect(counter.getSum({})).toBe(7);
  expect(computeCount.mock.calls.length).toBe(5);
});
