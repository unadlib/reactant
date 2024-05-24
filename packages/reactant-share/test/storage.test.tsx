/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-promise-executor-return */
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
  delegate,
  PortDetector,
  optional,
  Storage,
  StorageOptions,
  IStorageOptions,
  mockPairTransports,
  computed,
  watch,
} from '..';
import { MemoryStorage } from './MemoryStorage';

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
            onClick={() => delegate(this.counter, 'decrease', [])}
          >
            -
          </button>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => delegate(this.counter, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  test('base server/client port mode with storage', async () => {
    const storage = new MemoryStorage();

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Storage,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
      ],
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
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await serverApp.bootstrap(serverContainer);

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);
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

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(3);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(3);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });
  test('base SPA mode with storage', async () => {
    const storage = new MemoryStorage();

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const app = await createSharedApp({
      modules: [
        Storage,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
      },
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await app.bootstrap(serverContainer);

    await new Promise((resolve) => setTimeout(resolve));

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

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
  });

  test('base server/client port mode with storage for checking error', async () => {
    const storage = new MemoryStorage();

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    @injectable()
    class Counter0 {
      constructor(
        private portDetector: PortDetector,
        private storage: Storage
      ) {
        // All state within this module will not be shared with any clients.
        this.portDetector.disableShare(this);
        this.storage.setStorage(this, {
          whitelist: ['count'],
        });
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
      constructor(
        private portDetector: PortDetector,
        private storage: Storage
      ) {
        // All state within this module will not be shared with any clients.
        this.portDetector.disableShare(this);
        this.storage.setStorage(this, {
          whitelist: ['count'],
        });
      }

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    @injectable({
      name: 'Counter2',
    })
    class Counter2 {
      constructor(
        private portDetector: PortDetector,
        private storage: Storage
      ) {
        this.storage.setStorage(this, {
          whitelist: ['count'],
        });
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

    await expect(() =>
      createSharedApp({
        modules: [
          Counter0,
          Storage,
          {
            provide: StorageOptions,
            useValue: {
              storage,
              blacklist: [],
            } as IStorageOptions,
          },
        ],
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
      })
    ).rejects.toEqual(
      new Error(
        `Module 'Counter0' is invalid for using 'setStorage', the parameter 'options.name' of the decorator '@injectable(options)' that decorates the 'Counter0' module must be specified as a string.`
      )
    );

    await expect(() =>
      createSharedApp({
        modules: [
          Counter1,
          Storage,
          {
            provide: StorageOptions,
            useValue: {
              storage,
              blacklist: [],
            } as IStorageOptions,
          },
        ],
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
      })
    ).rejects.toEqual(
      new Error(
        `The module "Counter1" has been disabled for state sharing, its module state cannot be enabled for storage.`
      )
    );

    await expect(() =>
      createSharedApp({
        modules: [
          Counter2,
          Storage,
          {
            provide: StorageOptions,
            useValue: {
              storage,
              blacklist: [],
            } as IStorageOptions,
          },
        ],
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
      })
    ).rejects.toEqual(
      new Error(
        `The module "Counter2" has been disabled for state sharing, its module state cannot be enabled for storage.`
      )
    );
  });

  test('base SPA mode with storage and enable auto-computed', async () => {
    @injectable({
      name: 'counter1',
    })
    class Counter1 {
      constructor(private storage: Storage) {
        this.storage.setStorage(this, {
          whitelist: ['count1'],
        });
      }

      @state
      count1 = 0;

      @action
      increase() {
        this.count1 += 1;
      }

      @computed
      get doubleCount() {
        return this.count1 * 2;
      }
    }

    const storage = new MemoryStorage({
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:counter1':
        '{"count1":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const app = await createSharedApp({
      modules: [
        Storage,
        Counter1,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
      },
      devOptions: {
        autoComputed: true,
      },
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await app.bootstrap(serverContainer);

    await new Promise((resolve) => setTimeout(resolve));

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

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');

    await new Promise((resolve) => setTimeout(resolve));

    expect(app.container.get(Counter1).doubleCount).toBe(2);
  });

  test('base SPA mode with storage and enable auto-computed', async () => {
    @injectable({
      name: 'counter1',
    })
    class Counter1 {
      constructor(private storage: Storage) {
        this.storage.setStorage(this, {
          whitelist: ['count1'],
        });
        watch(
          this,
          () => this.count1,
          () => {
            expect(this.doubleCount).toBe(2);
            expect(this.count1).toBe(1);
          }
        );
      }

      @state
      count1 = 0;

      @action
      increase() {
        this.count1 += 1;
      }

      @computed
      get doubleCount() {
        return this.count1 * 2;
      }
    }

    const storage = new MemoryStorage({
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:counter1':
        '{"count1":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const app = await createSharedApp({
      modules: [
        Storage,
        Counter1,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'Base',
      },
      devOptions: {
        autoComputed: true,
      },
    });
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    await app.bootstrap(serverContainer);

    await new Promise((resolve) => setTimeout(resolve));

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

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');

    await new Promise((resolve) => setTimeout(resolve));

    expect(app.container.get(Counter1).doubleCount).toBe(2);
  });
});
