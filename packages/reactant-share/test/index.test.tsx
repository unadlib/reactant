import fs from 'fs';
import path from 'path';
import React from 'react';
import { mockPairPorts } from 'data-transport';
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
  proxy,
  PortDetector,
  createTransport,
  optional,
} from '..';
import { useLock } from '../src/lock';

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

    @proxy
    async decrease() {
      return this.counter.decrease();
    }

    @proxy
    async increase() {
      return this.counter.increase();
    }

    component() {
      const count = useConnector(() => this.counter.count);
      return (
        <>
          <button id="decrease" type="button" onClick={() => this.decrease()}>
            -
          </button>
          <div id="count">{count}</div>
          <button id="increase" type="button" onClick={() => this.increase()}>
            +
          </button>
        </>
      );
    }
  }
  test.each([
    { type: 'Base' },
    { type: 'BrowserExtension' },
    { type: 'SharedWorker' },
    { type: 'ServiceWorker' },
  ])('base server/client port mode in $type', async ({ type }: any) => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const ports = mockPairPorts();

    const serverApp = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type,
        port: 'server',
        transports: {
          server: createTransport('Base', ports[0]),
        },
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
    // expect(subscribeOnServerFn.mock.calls.length).toBe(1);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

    const clientApp = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type,
        port: 'client',
        transports: {
          client: createTransport('Base', ports[1]),
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

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

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });

  test('base server/client port mode in SharedTab', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const ports = mockPairPorts();
    const ports1 = mockPairPorts();

    const sharedApp0 = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        transports: {
          server: createTransport('Base', ports[0]),
          client: createTransport('Base', ports1[0]),
        },
      },
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    act(() => {
      sharedApp0.bootstrap(serverContainer);
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const sharedApp1 = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        transports: {
          server: createTransport('Base', ports1[0]),
          client: createTransport('Base', ports[1]),
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    act(() => {
      sharedApp1.bootstrap(clientContainer);
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

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });

  test('base server/Minimal set client port mode', async () => {
    const ports = mockPairPorts();

    const serverApp = await createSharedApp({
      modules: [{ provide: 'todoList', useClass: TodoList }],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
        port: 'server',
        transports: {
          server: createTransport('Base', ports[0]),
        },
      },
    });
    act(() => {
      serverApp.bootstrap(serverContainer);
    });
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
          client: createTransport('Base', ports[1]),
        },
        enablePatchesFilter: true,
      },
    });
    act(() => {
      clientApp.bootstrap(clientContainer);
    });
    expect(clientContainer.querySelector('#count')?.textContent).toBe('0');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('1');

    expect(clientApp.store?.getState().counter.obj.number).toBe(1);

    act(() => {
      clientContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');

    expect(clientApp.store?.getState().counter.obj.number).toBe(2);
  });
});
