import React from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';
import {
  injectable,
  state,
  action,
  ViewModule,
  useConnector,
  subscribe,
  createSharedApp,
  spawn,
  PortDetector,
  optional,
  mockPairTransports,
} from '..';

let serverContainer: Element;
let clientContainer: Element;

beforeEach(() => {
  serverContainer = document.createElement('div');
  document.body.appendChild(serverContainer);
  clientContainer = document.createElement('div');
  document.body.appendChild(clientContainer);
});

afterEach(() => {
  unmountComponentAtNode(serverContainer);
  serverContainer.remove();
  unmountComponentAtNode(clientContainer);
  clientContainer.remove();
});

describe('base', () => {
  @injectable({
    name: 'todoList',
  })
  class TodoList {
    @state
    list: number[] = [1];

    @action
    add(num: number) {
      // ✅ good practice
      this.list.push(num);
    }

    @action
    add1(num: number) {
      // ❌ bad practice
      this.list = [...this.list, num];
    }
  }

  let onClientFn: jest.Mock<any, any>;
  let subscribeOnClientFn: jest.Mock<any, any>;

  let onServerFn: jest.Mock<any, any>;
  let subscribeOnServerFn: jest.Mock<any, any>;

  @injectable({
    name: 'counter',
  })
  class Counter {
    constructor(
      private portDetector: PortDetector,
      @optional('todoList') private todoList: TodoList
    ) {
      this.portDetector.onClient(() => {
        onClientFn?.();
        return subscribe(this, () => {
          subscribeOnClientFn?.();
        });
      });
      this.portDetector.onServer(() => {
        onServerFn?.();
        return subscribe(this, () => {
          subscribeOnServerFn?.();
        });
      });
    }

    @state
    count = 0;

    @state
    obj: Record<string, number> = {
      c: 1,
    };

    @state
    obj1: Record<string, number> = {};

    @state
    arr1: number[] = [];

    @action
    increase() {
      this.count += 1;
      // ✅ good practice
      this.obj.number = this.count;
      this.todoList?.add(this.count);
    }

    @action
    decrease() {
      this.count -= 1;
      // ❌ bad practice
      this.obj = {
        number: this.count,
      };
      this.todoList?.add1(this.count);
    }
  }

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counter: Counter) {
      super();
    }

    component() {
      const count = useConnector(() => this.counter.count);
      return (
        <>
          <button
            id="decrease"
            type="button"
            onClick={() => spawn(this.counter, 'decrease', [])}
          >
            -
          </button>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => spawn(this.counter, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  test('base checkPatches', async () => {
    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [{ provide: 'todoList', useClass: TodoList }],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
        port: 'server',
        transports: {
          server: transports[0],
        },
        enablePatchesChecker: true,
      },
    });
    await serverApp.bootstrap(serverContainer);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

    const clientApp = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
        port: 'client',
        transports: {
          client: transports[1],
        },
        enablePatchesFilter: true,
      },
    });
    await clientApp.bootstrap(clientContainer);
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    expect(spy.mock.calls).toEqual([]);

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');
    expect(spy.mock.calls).toEqual([]);

    act(() => {
      serverContainer
        .querySelector('#decrease')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');
    expect(spy.mock.calls).toEqual([
      [
        "The state 'todoList.list' operation in the method 'decrease' of the module 'counter'  is a replacement update operation, be sure to check the state 'todoList.list' update operation and use mutation updates to ensure the minimum set of update patches.",
      ],
      [
        "The state 'counter.obj' operation in the method 'decrease' of the module 'counter'  is a replacement update operation, be sure to check the state 'counter.obj' update operation and use mutation updates to ensure the minimum set of update patches.",
      ],
    ]);
  });
});
