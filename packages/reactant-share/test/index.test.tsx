import React from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';
import { LastAction } from 'reactant-last-action';
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
  fork,
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

    num = 1;

    setNum(num: number) {
      this.num = num;
      return this.num;
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

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type,
        port: 'server',
        transports: {
          server: transports[0],
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
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
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
          client: transports[1],
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
    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

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
    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');

    expect(clientApp.instance.counter.num).toBe(1);
    expect(serverApp.instance.counter.num).toBe(1);

    const result0 = await fork(serverApp.instance.counter, 'setNum', [2]);

    expect(clientApp.instance.counter.num).toBe(2);
    expect(serverApp.instance.counter.num).toBe(1);
    expect(result0).toBe(2);

    const result1 = await fork(serverApp.instance.counter, 'setNum', [3], {
      respond: false,
    });

    expect(clientApp.instance.counter.num).toBe(3);
    expect(serverApp.instance.counter.num).toBe(1);
    expect(result1).toBeUndefined();

    const result2 = await spawn(clientApp.instance.counter, 'setNum', [4]);

    expect(clientApp.instance.counter.num).toBe(3);
    expect(serverApp.instance.counter.num).toBe(4);
    expect(result2).toBe(4);

    const result3 = await spawn(clientApp.instance.counter, 'setNum', [5], {
      respond: false,
    });

    expect(clientApp.instance.counter.num).toBe(3);
    expect(serverApp.instance.counter.num).toBe(5);
    expect(result3).toBeUndefined();
  });

  test('base server/client port mode in SharedTab', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();
    const transports1 = mockPairTransports();

    const sharedApp0 = await createSharedApp({
      modules: [],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        transports: {
          server: transports[0],
          client: transports1[0],
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
          server: transports1[0],
          client: transports[1],
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

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

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

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });

  test('base server/Minimal set client port mode', async () => {
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
          client: transports[1],
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

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('1');

    expect(clientApp.store?.getState().counter.obj.number).toBe(1);

    act(() => {
      clientContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');

    expect(clientApp.store?.getState().counter.obj.number).toBe(2);

    act(() => {
      clientContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    const fn = jest.fn();
    clientApp.store!.subscribe(fn);
    expect(fn.mock.calls.length).toBe(0);
    await serverApp.container.get(PortDetector).syncToClients();
    expect(fn.mock.calls.length).toBe(1);

    await clientApp.container.get(PortDetector).syncFullState();
    expect(fn.mock.calls.length).toBe(1);
    expect(clientApp.container.get(LastAction).sequence).toBe(
      serverApp.container.get(LastAction).sequence
    );

    clientApp.container.get(LastAction).sequence = -1;
    await clientApp.container.get(PortDetector).syncFullState();
    expect(fn.mock.calls.length).toBe(2);

    await clientApp.container.get(PortDetector).syncFullState();
    expect(fn.mock.calls.length).toBe(2);

    await clientApp.container
      .get(PortDetector)
      .syncFullState({ forceSync: true });
    expect(fn.mock.calls.length).toBe(3);
  });
});
