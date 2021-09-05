import React from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
import { mockPairPorts } from 'data-transport';
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
  optional,
  createTransport,
  Storage,
  StorageOptions,
  IStorageOptions,
} from '..';

class MemoryStorage {
  constructor(public data: Record<string, any> = {}) {}

  getItem(key: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.data[key]);
    });
  }

  setItem(key: string, item: string) {
    return new Promise((resolve) => {
      this.data[key] = item;
      resolve(undefined);
    });
  }

  removeItem(key: string) {
    return new Promise((resolve) => {
      delete this.data[key];
      resolve(undefined);
    });
  }
}

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
  test('base server/client port mode with storage', async () => {
    const storage = new MemoryStorage();

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const ports = mockPairPorts();

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
          client: createTransport('Base', ports[1]),
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);

    act(() => {
      clientApp.bootstrap(clientContainer);
    });
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

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(3);

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });
});
