/* eslint-disable @typescript-eslint/no-empty-function */
import { Action } from 'redux';
import {
  injectable,
  createContainer,
  dispatch,
  state,
  createStore,
  createState,
  action,
} from '../..';

test('`dispatch` without action type', () => {
  const type = 'count_increase';

  interface CountAction {
    type: typeof type;
    state: number;
  }

  @injectable()
  class Counter {
    @state
    count = createState<CountAction['state'], CountAction>(
      ($state = 0, $action) => ($action.type === type ? $action.state : $state)
    );

    increase() {
      dispatch<CountAction>(this, {
        type,
        state: this.count + 1,
      });
    }

    @action
    decrease() {
      this.count -= 1;
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
  counter.increase();
  expect(counter.count).toBe(1);
  expect(Object.values(store.getState())).toEqual([{ count: 1 }]);
  counter.decrease();
  expect(counter.count).toBe(0);
  expect(Object.values(store.getState())).toEqual([{ count: 0 }]);
});
