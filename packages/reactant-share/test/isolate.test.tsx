/* eslint-disable no-promise-executor-return */
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
      public portDetector: PortDetector,
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
  test('base server/Minimal set client port mode with disable share state', async () => {
    const transports = mockPairTransports();

    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();

    @injectable({
      name: 'Counter0',
    })
    class Counter0 {
      constructor(private portDetector: PortDetector) {
        // All state within this module will not be shared with any clients.
        this.portDetector.disableShare(this);
      }

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    const serverApp = await createSharedApp({
      modules: [{ provide: 'todoList', useClass: TodoList }, Counter0],
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

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverApp.container.get(Counter0).count).toBe(0);
    serverApp.container.get(Counter0).increase();
    expect(serverApp.container.get(Counter0).count).toBe(1);

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);

    const clientApp = await createSharedApp({
      modules: [Counter0],
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

    await clientApp.container
      .get(PortDetector)
      .syncFullState({ forceSync: false });
    expect(fn.mock.calls.length).toBe(1);
    expect(clientApp.container.get(LastAction).sequence).toBe(
      serverApp.container.get(LastAction).sequence
    );

    clientApp.container.get(LastAction).sequence = -1;
    await clientApp.container
      .get(PortDetector)
      .syncFullState({ forceSync: false });
    expect(fn.mock.calls.length).toBe(2);

    await clientApp.container
      .get(PortDetector)
      .syncFullState({ forceSync: false });
    expect(fn.mock.calls.length).toBe(2);

    await clientApp.container.get(PortDetector).syncFullState();
    expect(fn.mock.calls.length).toBe(3);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(6);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);

    expect(clientApp.container.get(Counter0).count).toBe(0);
    clientApp.container.get(Counter0).increase();
    expect(clientApp.container.get(Counter0).count).toBe(1);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(7);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);

    expect(serverApp.container.get(Counter0).count).toBe(1);
    serverApp.container.get(Counter0).increase();
    expect(serverApp.container.get(Counter0).count).toBe(2);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(7);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(5);

    expect(clientApp.container.get(Counter0).count).toBe(1);
    clientApp.container.get(Counter0).increase();
    expect(clientApp.container.get(Counter0).count).toBe(2);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(8);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(5);
  });

  test('base SPA mode with disable share state', async () => {
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();

    @injectable({
      name: 'Counter0',
    })
    class Counter0 {
      constructor(private portDetector: PortDetector) {
        // All state within this module will not be shared with any clients.
        this.portDetector.disableShare(this);
      }

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    const app = await createSharedApp({
      modules: [Counter0],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
      },
    });

    expect(app.instance.counter.portDetector.shared).toBe(false);

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await app.bootstrap(serverContainer);
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');
    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(app.container.get(Counter0).count).toBe(0);
    app.container.get(Counter0).increase();
    expect(app.container.get(Counter0).count).toBe(1);

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
  });

  test.each([{ type: 'Base' }, { type: 'SharedWorker' }])(
    'base server/client port mode in $type with disable share state',
    async ({ type }: any) => {
      onClientFn = jest.fn();
      subscribeOnClientFn = jest.fn();
      onServerFn = jest.fn();
      subscribeOnServerFn = jest.fn();

      @injectable({
        name: 'Counter0',
      })
      class Counter0 {
        constructor(private portDetector: PortDetector) {
          // All state within this module will not be shared with any clients.
          this.portDetector.disableShare(this);
        }

        @state
        count = 0;

        @action
        increase() {
          this.count += 1;
        }
      }

      @injectable({
        name: 'Counter1',
      })
      class Counter1 {
        constructor(private counter0: Counter0) {}

        @state
        count = 0;

        @action
        increase() {
          this.count += 1;
          this.counter0.increase();
        }
      }

      const transports = mockPairTransports();

      const serverApp = await createSharedApp({
        modules: [Counter0, Counter1],
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
      expect(serverApp.instance.counter.portDetector.shared).toBe(true);

      expect(onClientFn.mock.calls.length).toBe(0);
      expect(subscribeOnClientFn.mock.calls.length).toBe(0);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(0);
      await serverApp.bootstrap(serverContainer);
      expect(onClientFn.mock.calls.length).toBe(0);
      expect(subscribeOnClientFn.mock.calls.length).toBe(0);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(0);
      expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

      expect(serverApp.container.get(PortDetector).lastAction.sequence).toBe(1);

      expect(serverApp.container.get(Counter0).count).toBe(0);
      serverApp.container.get(Counter0).increase();
      expect(serverApp.container.get(Counter0).count).toBe(1);

      expect(serverApp.container.get(PortDetector).lastAction.sequence).toBe(1);

      expect(onClientFn.mock.calls.length).toBe(0);
      expect(subscribeOnClientFn.mock.calls.length).toBe(0);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(1);

      const clientApp = await createSharedApp({
        modules: [Counter0, Counter1],
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
      expect(subscribeOnServerFn.mock.calls.length).toBe(1);

      await clientApp.bootstrap(clientContainer);

      expect(onClientFn.mock.calls.length).toBe(1);
      expect(subscribeOnClientFn.mock.calls.length).toBe(0);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(1);
      expect(clientContainer.querySelector('#count')?.textContent).toBe('0');

      expect(serverApp.container.get(PortDetector).lastAction.sequence).toBe(1);
      expect(clientApp.container.get(PortDetector).lastAction.sequence).toBe(1);

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
      expect(subscribeOnServerFn.mock.calls.length).toBe(2);

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
      expect(subscribeOnServerFn.mock.calls.length).toBe(3);

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

      expect(serverApp.container.get(PortDetector).lastAction.sequence).toBe(3);
      expect(clientApp.container.get(PortDetector).lastAction.sequence).toBe(3);

      expect(clientApp.instance.counter.num).toBe(3);
      expect(serverApp.instance.counter.num).toBe(5);
      expect(result3).toBeUndefined();

      expect(clientApp.container.get(Counter0).count).toBe(0);
      clientApp.container.get(Counter0).increase();
      expect(clientApp.container.get(Counter0).count).toBe(1);

      expect(onClientFn.mock.calls.length).toBe(1);
      expect(subscribeOnClientFn.mock.calls.length).toBe(3);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(3);

      expect(serverApp.container.get(Counter0).count).toBe(1);
      serverApp.container.get(Counter0).increase();
      expect(serverApp.container.get(Counter0).count).toBe(2);

      expect(onClientFn.mock.calls.length).toBe(1);
      expect(subscribeOnClientFn.mock.calls.length).toBe(3);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(4);

      expect(clientApp.container.get(Counter0).count).toBe(1);
      clientApp.container.get(Counter0).increase();
      expect(clientApp.container.get(Counter0).count).toBe(2);

      expect(onClientFn.mock.calls.length).toBe(1);
      expect(subscribeOnClientFn.mock.calls.length).toBe(4);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(4);

      expect(serverApp.container.get(PortDetector).lastAction.sequence).toBe(3);
      expect(clientApp.container.get(PortDetector).lastAction.sequence).toBe(3);

      expect(() => {
        clientApp.container.get(Counter1).increase();
      }).toThrowError(
        `Update state error: Mixed update of shared state and isolated state is not supported, please check method 'Counter1.increase'.`
      );
      expect(() => {
        serverApp.container.get(Counter1).increase();
      }).toThrowError(
        `Update state error: Mixed update of shared state and isolated state is not supported, please check method 'Counter1.increase'.`
      );
    }
  );

  test('base server/client port mode in SharedTab with disable share state', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    @injectable({
      name: 'Counter0',
    })
    class Counter0 {
      constructor(private portDetector: PortDetector) {
        // All state within this module will not be shared with any clients.
        this.portDetector.disableShare(this);
      }

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    const transports = mockPairTransports();
    const transports1 = mockPairTransports();

    const sharedApp0 = await createSharedApp({
      modules: [Counter0],
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
    expect(sharedApp0.instance.counter.portDetector.shared).toBe(true);

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await sharedApp0.bootstrap(serverContainer);
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

    expect(sharedApp0.container.get(Counter0).count).toBe(0);
    sharedApp0.container.get(Counter0).increase();
    expect(sharedApp0.container.get(Counter0).count).toBe(1);

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);

    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const sharedApp1 = await createSharedApp({
      modules: [Counter0],
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
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);

    await sharedApp1.bootstrap(clientContainer);
    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);
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
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

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
    expect(subscribeOnServerFn.mock.calls.length).toBe(3);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');

    expect(sharedApp1.container.get(Counter0).count).toBe(0);
    sharedApp1.container.get(Counter0).increase();
    expect(sharedApp1.container.get(Counter0).count).toBe(1);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(3);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(3);

    expect(sharedApp0.container.get(Counter0).count).toBe(1);
    sharedApp0.container.get(Counter0).increase();
    expect(sharedApp0.container.get(Counter0).count).toBe(2);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(3);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);

    expect(sharedApp1.container.get(Counter0).count).toBe(1);
    sharedApp1.container.get(Counter0).increase();
    expect(sharedApp1.container.get(Counter0).count).toBe(2);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);
  });
});
