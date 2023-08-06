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
  CoworkerExecutor,
  CoworkerAdapter,
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

  let coworkerModuleFn: jest.Mock<any, any>;

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

  @injectable({
    name: 'ProxyCounter',
  })
  class ProxyCounter {
    constructor(public coworkerAdapter: CoworkerAdapter) {}

    @state
    count = 0;

    @action
    increase() {
      coworkerModuleFn(this.coworkerAdapter.isCoworker);
      this.count += 1;
    }

    @action
    decrease() {
      this.count -= 1;
    }
  }

  test.each([{ type: 'Base' }, { type: 'SharedWorker' }])(
    'coworker - server/client port mode in $type',
    async ({ type }: any) => {
      onClientFn = jest.fn();
      subscribeOnClientFn = jest.fn();
      onServerFn = jest.fn();
      subscribeOnServerFn = jest.fn();
      coworkerModuleFn = jest.fn();

      const transports = mockPairTransports();
      const coworkerTransports = mockPairTransports();

      const serverApp = await createSharedApp({
        modules: [ProxyCounter],
        main: AppView,
        render,
        share: {
          name: 'counter',
          type,
          port: 'server',
          transports: {
            server: transports[0],
          },
          coworker: {
            isCoworker: false,
            modules: [ProxyCounter],
            transports: {
              main: coworkerTransports[0],
            },
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

      const coworkerApp = await createSharedApp({
        modules: [ProxyCounter],
        main: AppView,
        render,
        share: {
          name: 'counter',
          type,
          transports: {
            server: transports[0],
          },
          coworker: {
            isCoworker: true,
            modules: [ProxyCounter],
            transports: {
              coworker: coworkerTransports[1],
            },
          },
        },
      });

      const clientApp = await createSharedApp({
        modules: [ProxyCounter],
        main: AppView,
        render,
        share: {
          name: 'counter',
          type,
          port: 'client',
          transports: {
            client: transports[1],
          },
          coworker: {
            isCoworker: false,
            modules: [ProxyCounter],
          },
        },
      });

      expect(onClientFn.mock.calls.length).toBe(1);
      expect(subscribeOnClientFn.mock.calls.length).toBe(0);
      expect(onServerFn.mock.calls.length).toBe(1);
      expect(subscribeOnServerFn.mock.calls.length).toBe(1);

      await clientApp.bootstrap(clientContainer);

      expect(onClientFn.mock.calls.length).toBe(1);
      expect(subscribeOnClientFn.mock.calls.length).toBe(1);
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
      expect(subscribeOnClientFn.mock.calls.length).toBe(2);
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
      expect(subscribeOnClientFn.mock.calls.length).toBe(3);
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

      expect(clientApp.instance.counter.num).toBe(3);
      expect(serverApp.instance.counter.num).toBe(5);
      expect(result3).toBeUndefined();

      expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 0 });
      expect(serverApp.store?.getState().ProxyCounter).toEqual({ count: 0 });
      expect(clientApp.store?.getState().ProxyCounter).toEqual({ count: 0 });
      expect(coworkerModuleFn.mock.calls).toEqual([]);

      coworkerApp.container.get(ProxyCounter).increase();
      expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 1 });
      expect(serverApp.store?.getState().ProxyCounter).toEqual({ count: 1 });
      expect(clientApp.store?.getState().ProxyCounter).toEqual({ count: 1 });
      expect(coworkerModuleFn.mock.calls).toEqual([[true]]);

      await spawn(coworkerApp.container.get(ProxyCounter), 'increase', []);

      expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 2 });
      expect(serverApp.store?.getState().ProxyCounter).toEqual({ count: 2 });
      expect(clientApp.store?.getState().ProxyCounter).toEqual({ count: 2 });
      expect(coworkerModuleFn.mock.calls).toEqual([[true], [true]]);

      await spawn(serverApp.container.get(ProxyCounter), 'increase', []);

      expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 3 });
      expect(serverApp.store?.getState().ProxyCounter).toEqual({ count: 3 });
      expect(clientApp.store?.getState().ProxyCounter).toEqual({ count: 3 });
      expect(coworkerModuleFn.mock.calls).toEqual([[true], [true], [true]]);

      await spawn(clientApp.container.get(ProxyCounter), 'increase', []);

      expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 4 });
      expect(serverApp.store?.getState().ProxyCounter).toEqual({ count: 4 });
      expect(clientApp.store?.getState().ProxyCounter).toEqual({ count: 4 });
      expect(coworkerModuleFn.mock.calls).toEqual([
        [true],
        [true],
        [true],
        [true],
      ]);
    }
  );

  test('coworker - in base mode ', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();
    coworkerModuleFn = jest.fn();

    const transports = mockPairTransports();
    const coworkerTransports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [ProxyCounter],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
        transports: {
          server: transports[0],
        },
        coworker: {
          isCoworker: false,
          modules: [ProxyCounter],
          transports: {
            main: coworkerTransports[0],
          },
        },
      },
    });
    expect(serverApp.instance.counter.portDetector.shared).toBe(false);

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await serverApp.bootstrap(serverContainer);
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverContainer.querySelector('#count')?.textContent).toBe('0');

    expect(serverApp.container.get(ProxyCounter).count).toBe(0);

    const coworkerApp = await createSharedApp({
      modules: [ProxyCounter],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
        transports: {
          server: transports[0],
        },
        coworker: {
          isCoworker: true,
          modules: [ProxyCounter],
          transports: {
            coworker: coworkerTransports[1],
          },
        },
      },
    });

    expect(coworkerApp.container.get(ProxyCounter).count).toBe(0);

    await spawn(serverApp.container.get(ProxyCounter), 'increase', []);
    expect(coworkerApp.container.get(ProxyCounter).count).toBe(1);
    expect(serverApp.container.get(ProxyCounter).count).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    coworkerApp.container.get(ProxyCounter).increase();
    expect(coworkerApp.container.get(ProxyCounter).count).toBe(2);
    expect(serverApp.container.get(ProxyCounter).count).toBe(2);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
  });

  test('coworker - server/client port mode in SharedTab', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();
    coworkerModuleFn = jest.fn();

    const transports = mockPairTransports();
    const transports1 = mockPairTransports();
    const coworkerTransports = mockPairTransports();

    const sharedApp0 = await createSharedApp({
      modules: [ProxyCounter],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        transports: {
          server: transports[0],
          client: transports1[0],
        },
        coworker: {
          isCoworker: false,
          modules: [ProxyCounter],
          transports: {
            main: coworkerTransports[0],
          },
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

    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const sharedApp1 = await createSharedApp({
      modules: [ProxyCounter],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedTab',
        transports: {
          server: transports1[0],
          client: transports[1],
        },
        coworker: {
          isCoworker: false,
          modules: [ProxyCounter],
          transports: {
            main: coworkerTransports[0],
          },
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    await sharedApp1.bootstrap(clientContainer);
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

    const coworkerApp = await createSharedApp({
      modules: [ProxyCounter],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
        transports: {
          server: transports[0],
        },
        coworker: {
          isCoworker: true,
          modules: [ProxyCounter],
          transports: {
            coworker: coworkerTransports[1],
          },
        },
      },
    });

    expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 0 });
    expect(sharedApp0.store?.getState().ProxyCounter).toEqual({ count: 0 });
    expect(sharedApp1.store?.getState().ProxyCounter).toEqual({ count: 0 });
    expect(coworkerModuleFn.mock.calls).toEqual([]);

    coworkerApp.container.get(ProxyCounter).increase();
    expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 1 });
    expect(sharedApp0.store?.getState().ProxyCounter).toEqual({ count: 1 });
    expect(sharedApp1.store?.getState().ProxyCounter).toEqual({ count: 1 });
    expect(coworkerModuleFn.mock.calls).toEqual([[true]]);

    await spawn(coworkerApp.container.get(ProxyCounter), 'increase', []);

    expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 2 });
    expect(sharedApp0.store?.getState().ProxyCounter).toEqual({ count: 2 });
    expect(sharedApp1.store?.getState().ProxyCounter).toEqual({ count: 2 });
    expect(coworkerModuleFn.mock.calls).toEqual([[true], [true]]);

    await spawn(sharedApp0.container.get(ProxyCounter), 'increase', []);

    expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 3 });
    expect(sharedApp0.store?.getState().ProxyCounter).toEqual({ count: 3 });
    expect(sharedApp1.store?.getState().ProxyCounter).toEqual({ count: 3 });
    expect(coworkerModuleFn.mock.calls).toEqual([[true], [true], [true]]);

    await spawn(sharedApp1.container.get(ProxyCounter), 'increase', []);

    expect(coworkerApp.store?.getState().ProxyCounter).toEqual({ count: 4 });
    expect(sharedApp0.store?.getState().ProxyCounter).toEqual({ count: 4 });
    expect(sharedApp1.store?.getState().ProxyCounter).toEqual({ count: 4 });
    expect(coworkerModuleFn.mock.calls).toEqual([
      [true],
      [true],
      [true],
      [true],
    ]);
  });
});
