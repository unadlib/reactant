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
    @injectable()
    class BaseCounter {
      computedFn = jest.fn();

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @computed(({ count }: BaseCounter) => [count])
      get num() {
        this.computedFn();
        return this.count + 1;
      }
    }

    @injectable()
    class Counter extends BaseCounter {
      computedFn1 = jest.fn();

      @state
      count1 = 0;

      @action
      increase1() {
        this.count1 += 1;
      }

      @computed(({ count, count1 }: Counter) => [count, count1])
      get num() {
        this.computedFn1();
        // @ts-ignore
        return this.count1 + super.num;
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
    expect(counter.computedFn.mock.calls.length).toBe(0);
    expect(counter.computedFn1.mock.calls.length).toBe(0);
    counter.increase();
    expect(counter.num).toBe(2);
    expect(counter.computedFn.mock.calls.length).toBe(1);
    expect(counter.computedFn1.mock.calls.length).toBe(1);
    counter.increase1();
    expect(counter.num).toBe(3);
    expect(counter.computedFn.mock.calls.length).toBe(2); // TODO: check deps cover from subclass
    expect(counter.computedFn1.mock.calls.length).toBe(2);
    expect(counter.num).toBe(3);
    expect(counter.computedFn.mock.calls.length).toBe(2);
    expect(counter.computedFn1.mock.calls.length).toBe(2);
  });
});
