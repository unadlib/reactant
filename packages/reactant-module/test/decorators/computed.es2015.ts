import {
  injectable,
  createContainer,
  state,
  createStore,
  action,
  computed,
} from '../..';

describe('@computed', () => {
  test('inheritance', () => {
    const computedFn = jest.fn();
    const computedFn1 = jest.fn();

    @injectable()
    class BaseCounter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: BaseCounter) => [count])
      get num() {
        computedFn();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter extends BaseCounter {
      @state
      count1 = 0;

      @action
      increase1() {
        this.count1 += 1;
      }

      @computed(({ count, count1 }: Counter) => [count, count1])
      get num1() {
        computedFn1();
        return this.count1 + this.num;
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
    expect(computedFn.mock.calls.length).toBe(0);
    expect(computedFn1.mock.calls.length).toBe(0);
    counter.increase();
    expect(counter.num).toBe(2);
    expect(counter.num1).toBe(2);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(computedFn1.mock.calls.length).toBe(1);
    counter.increase1();
    expect(counter.num1).toBe(3);
    expect(computedFn.mock.calls.length).toBe(1);
    expect(computedFn1.mock.calls.length).toBe(2);
  });
});
