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
    list: number[] = [];

    @action
    add(num: number) {
      this.list.push(num);
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
    obj: Record<string, number> = {};

    @action
    increase() {
      this.count += 1;
      this.obj.number = this.count;
      this.todoList?.add(this.count);
    }

    @action
    decrease() {
      this.count -= 1;
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
  // TODO: broadcast-channel leaks.
  test.skip('base server/client port mode with broadcast-channel in SharedTab', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const serverApp = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        port: 'server',
      },
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    act(() => {
      serverApp.bootstrap(serverContainer);
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

    const clientApp = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        port: 'client',
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    await new Promise((resolve) => setTimeout(resolve, 500));

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#count')?.textContent).toBe('0');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('1');

    act(() => {
      clientContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });
});
