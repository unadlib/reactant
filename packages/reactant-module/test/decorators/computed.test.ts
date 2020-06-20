import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  computed,
} from '../..';

describe('@computed', () => {
  test('base', () => {
    const computedFn = jest.fn();

    @injectable()
    class Counter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: Counter) => [count])
      get num() {
        computedFn();
        return this.count + 1;
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
    const store = createStore(modules, container, ServiceIdentifiers);
    expect(computedFn.mock.calls.length).toBe(0);
    counter.increase();
    expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(counter.num).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    counter.increase();
    expect(counter.num).toBe(3);
    expect(computedFn.mock.calls.length).toBe(2);
  });
});
