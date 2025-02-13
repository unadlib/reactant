/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FunctionComponent } from 'react';
import { unmountComponentAtNode, render, Switch, Route } from 'reactant-web';
import type { History, LocationListener } from 'history';
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
  Router,
  mockPairTransports,
  IRouterOptions,
  createBrowserHistory,
  RouterOptions,
  createHashHistory,
  createMemoryHistory,
  fork,
  StorageOptions,
  IStorageOptions,
  Storage,
  optional,
} from '..';
import { MemoryStorage } from './MemoryStorage';

let serverContainer: Element;
let clientContainer: Element;

beforeEach(() => {
  window.location.href = 'http://localhost/';
  serverContainer = document.createElement('div');
  document.body.appendChild(serverContainer);
  clientContainer = document.createElement('div');
  document.body.appendChild(clientContainer);
});

afterEach(() => {
  clientContainer
    .querySelector('#home')
    ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  unmountComponentAtNode(serverContainer);
  serverContainer.remove();
  unmountComponentAtNode(clientContainer);
  clientContainer.remove();
});

const listenHashChange = () => {
  return new Promise<void>((resolve) => {
    const callback = () => {
      window.removeEventListener('hashchange', callback);
      resolve();
    };
    window.addEventListener('hashchange', callback);
  });
};

describe('base', () => {
  let onClientFn: jest.Mock<any, any>;
  let subscribeOnClientFn: jest.Mock<any, any>;

  let onServerFn: jest.Mock<any, any>;
  let subscribeOnServerFn: jest.Mock<any, any>;

  const Link: FunctionComponent<{
    active: boolean;
    onClick: () => any;
    id?: string;
  }> = ({ active, children, onClick, id }) => {
    return (
      <div
        onClick={onClick}
        style={{ color: active ? 'red' : 'black' }}
        id={id}
      >
        {children}
      </div>
    );
  };

  @injectable({
    name: 'counterView',
  })
  class CounterView extends ViewModule {
    constructor(public portDetector: PortDetector) {
      super();
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

    increase1?: () => void;

    name = 'counter';

    path = '/counter';

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    component(this: CounterView) {
      const count = useConnector(() => this.count);
      return (
        <>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => delegate(this, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counterView: CounterView, public router: Router) {
      super();
    }

    component() {
      const currentPath = useConnector(() => this.router.currentPath);

      return (
        <>
          <ul>
            <li>
              <Link
                active={currentPath === '/'}
                onClick={() => this.router.push('/')}
                id="home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                active={currentPath === this.counterView.path}
                onClick={() => this.router.push(this.counterView.path)}
                id={this.counterView.name}
              >
                {this.counterView.name}
              </Link>
            </li>
          </ul>

          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>home</h2>
              </Route>
              <Route
                path={this.counterView.path}
                component={this.counterView.component}
              />
            </Switch>
          </div>
        </>
      );
    }
  }
  test('base server/client port mode with router', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
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
    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);
    expect(serverContainer.querySelector('#content')?.textContent).toBe('home');

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
      ],
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
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    await clientApp.bootstrap(clientContainer);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      serverContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);
    expect(serverContainer.querySelector('#content')?.textContent).toBe('0+');
    // expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');
    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(6);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(5);

    expect(serverContainer.querySelector('#content')?.textContent).toBe('0+');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });

  test('base server/client port mode with router with go/back button', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();
    // TODO: Error: Not implemented: navigation https://github.com/jsdom/jsdom/issues/2112
    const historyListeners = new Set<LocationListener>();
    const MockRouterHistory = {
      provide: 'MockRouterHistory',
      useFactory: (router: Router) => {
        // eslint-disable-next-line prefer-destructuring
        const history: History = (router as any).history;
        const { listen } = history;
        history.listen = (callback) => {
          historyListeners.add(callback);
          return listen.call(history, (_location, _action) => {
            callback(_location, _action);
          });
        };
      },
      deps: [Router],
    };

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
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

    await serverApp.bootstrap(serverContainer);

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        MockRouterHistory,
      ],
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

    await clientApp.bootstrap(clientContainer);

    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(serverApp.instance.router.currentPath).toBe('/');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    // mock go back
    for (const callback of historyListeners) {
      callback(
        { pathname: '/', search: '', hash: '', state: undefined },
        'POP'
      );
      window.dispatchEvent(
        new CustomEvent('popstate', {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
    }
    // TODO: fix history go back mock
    // expect(clientApp.instance.router.currentPath).toBe('/');
    // expect(serverApp.instance.router.currentPath).toBe('/');
  });

  test('base server/client port mode in SharedTab', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();
    const transports1 = mockPairTransports();

    const sharedApp0 = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
      ],
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
    expect(sharedApp0.instance.counterView.portDetector.shared).toBe(true);
    await sharedApp0.bootstrap(serverContainer);

    expect(sharedApp0.instance.router.currentPath).toBe('/');

    const sharedApp1 = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
      ],
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

    await sharedApp1.bootstrap(clientContainer);

    expect(sharedApp0.instance.router.currentPath).toBe('/');
    expect(sharedApp1.instance.router.currentPath).toBe('/');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(sharedApp0.instance.router.currentPath).toBe('/counter');
    expect(sharedApp1.instance.router.currentPath).toBe('/counter');

    expect(clientContainer.querySelector('#count')!.textContent).toBe('0');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('1');

    act(() => {
      clientContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');
  });

  test('base server/client port mode with different port name in SharedTab', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();
    const transports1 = mockPairTransports();

    const sharedApp0 = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter-demo',
        type: 'SharedTab',
        portName: 'server-tab',
        transports: {
          server: transports[0],
          client: transports1[0],
        },
      },
    });
    expect(sharedApp0.instance.counterView.portDetector.shared).toBe(true);

    await sharedApp0.bootstrap(serverContainer);

    expect(sharedApp0.instance.router.currentPath).toBe('/');
    const sharedApp1 = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter-demo',
        type: 'SharedTab',
        portName: 'client-tab',
        transports: {
          server: transports1[0],
          client: transports[1],
        },
      },
    });

    await sharedApp1.bootstrap(clientContainer);

    expect(sharedApp0.instance.router.currentPath).toBe('/');
    expect(sharedApp1.instance.router.currentPath).toBe('/');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(sharedApp0.instance.router.currentPath).toBe('/');
    expect(sharedApp1.instance.router.currentPath).toBe('/counter');

    expect(clientContainer.querySelector('#count')!.textContent).toBe('0');

    act(() => {
      serverContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(sharedApp0.instance.router.currentPath).toBe('/counter');
    expect(sharedApp1.instance.router.currentPath).toBe('/counter');

    expect(serverContainer.querySelector('#count')!.textContent).toBe('0');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('1');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('1');

    act(() => {
      clientContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // waiting for sync state
    await new Promise((resolve) => setTimeout(resolve));

    expect(serverContainer.querySelector('#count')?.textContent).toBe('2');
    expect(clientContainer.querySelector('#count')?.textContent).toBe('2');

    const sharedApp0Fn = jest.fn();
    const sharedApp1Fn = jest.fn();

    sharedApp0.instance.counterView.increase1 = () => {
      sharedApp0Fn();
    };

    sharedApp1.instance.counterView.increase1 = () => {
      sharedApp1Fn();
    };

    fork(sharedApp0.instance.counterView, 'increase1' as any, [], {
      clientIds: [Math.random().toString()],
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(sharedApp0Fn).toBeCalledTimes(0);
    expect(sharedApp1Fn).toBeCalledTimes(0);

    fork(sharedApp0.instance.counterView, 'increase1' as any, [], {
      clientIds: [sharedApp1.instance.counterView.portDetector.clientId!],
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(sharedApp0Fn).toBeCalledTimes(0);
    expect(sharedApp1Fn).toBeCalledTimes(1);

    fork(sharedApp0.instance.counterView, 'increase1' as any, [], {
      clientIds: [sharedApp1.instance.counterView.portDetector.clientId!],
      portName: Math.random().toString(),
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(sharedApp0Fn).toBeCalledTimes(0);
    expect(sharedApp1Fn).toBeCalledTimes(1);

    fork(sharedApp0.instance.counterView, 'increase1' as any, [], {
      clientIds: [sharedApp1.instance.counterView.portDetector.clientId!],
      portName: sharedApp1.instance.counterView.portDetector.name,
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(sharedApp0Fn).toBeCalledTimes(0);
    expect(sharedApp1Fn).toBeCalledTimes(2);

    fork(sharedApp0.instance.counterView, 'increase1' as any, [], {
      clientIds: [Math.random().toString()],
      portName: sharedApp1.instance.counterView.portDetector.name,
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(sharedApp0Fn).toBeCalledTimes(0);
    expect(sharedApp1Fn).toBeCalledTimes(2);
  });
});

describe('SharedWorker', () => {
  let onClientFn: jest.Mock<any, any>;
  let subscribeOnClientFn: jest.Mock<any, any>;

  let onServerFn: jest.Mock<any, any>;
  let subscribeOnServerFn: jest.Mock<any, any>;

  const Link: FunctionComponent<{
    active: boolean;
    onClick: () => any;
    id?: string;
  }> = ({ active, children, onClick, id }) => {
    return (
      <div
        onClick={onClick}
        style={{ color: active ? 'red' : 'black' }}
        id={id}
      >
        {children}
      </div>
    );
  };

  @injectable({
    name: 'counterView',
  })
  class CounterView extends ViewModule {
    constructor(private portDetector: PortDetector) {
      super();
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

    name = 'counter';

    path = '/counter';

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    component(this: CounterView) {
      const count = useConnector(() => this.count);
      return (
        <>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => delegate(this, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counterView: CounterView, public router: Router) {
      super();
    }

    component() {
      const currentPath = useConnector(() => this.router.currentPath);

      return (
        <>
          <ul>
            <li>
              <Link
                active={currentPath === '/'}
                onClick={() => this.router.push('/')}
                id="home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                active={currentPath === this.counterView.path}
                onClick={() => this.router.push(this.counterView.path)}
                id={this.counterView.name}
              >
                {this.counterView.name}
              </Link>
            </li>
          </ul>

          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>home</h2>
              </Route>
              <Route
                path={this.counterView.path}
                component={this.counterView.component}
              />
            </Switch>
          </div>
        </>
      );
    }
  }
  test('base server/client port mode with router in SharedWorker', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
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

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    await clientApp.bootstrap(clientContainer);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });
});

describe('Worker', () => {
  let onClientFn: jest.Mock<any, any>;
  let subscribeOnClientFn: jest.Mock<any, any>;

  let onServerFn: jest.Mock<any, any>;
  let subscribeOnServerFn: jest.Mock<any, any>;

  const Link: FunctionComponent<{
    active: boolean;
    onClick: () => any;
    id?: string;
  }> = ({ active, children, onClick, id }) => {
    return (
      <div
        onClick={onClick}
        style={{ color: active ? 'red' : 'black' }}
        id={id}
      >
        {children}
      </div>
    );
  };

  @injectable({
    name: 'counterView',
  })
  class CounterView extends ViewModule {
    constructor(private portDetector: PortDetector) {
      super();
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

    name = 'counter';

    path = '/counter';

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    component(this: CounterView) {
      const count = useConnector(() => this.count);
      return (
        <>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => delegate(this, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counterView: CounterView, public router: Router) {
      super();
    }

    component() {
      const currentPath = useConnector(() => this.router.currentPath);

      return (
        <>
          <ul>
            <div id="replace" onClick={() => this.router.push('/')}>
              replace
            </div>
            <div id="go" onClick={() => this.router.go(-1)}>
              go
            </div>
            <div id="goBack" onClick={() => this.router.goBack()}>
              goBack
            </div>
            <div id="goForward" onClick={() => this.router.goForward()}>
              goForward
            </div>
            <li>
              <Link
                active={currentPath === '/'}
                onClick={() => this.router.push('/')}
                id="home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                active={currentPath === this.counterView.path}
                onClick={() => this.router.push(this.counterView.path)}
                id={this.counterView.name}
              >
                {this.counterView.name}
              </Link>
            </li>
          </ul>

          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>home</h2>
              </Route>
              <Route
                path={this.counterView.path}
                component={this.counterView.component}
              />
            </Switch>
          </div>
        </>
      );
    }
  }

  test('base server/client port mode with router in SharedWorker', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
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

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    // check for default route
    expect(serverApp.instance.router.currentPath).toBe('/');

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    // sync up router and trigger Redux update
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');
    let hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#replace')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#goBack')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#goForward')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#go')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });

  test('forcedSyncClient for server/client port mode with router in SharedWorker', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'server',
        transports: {
          server: transports[0],
        },
      },
    });
    await new Promise((resolve) => setTimeout(resolve));
    // check for default route
    expect(serverApp.instance.router.currentPath).toBe('/');

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
        forcedSyncClient: false,
      },
    });

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    serverApp.instance.counterView.increase();
    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.counterView.count).toBe(
      serverApp.instance.counterView.count
    );
    let visibilityState: 'visible' | 'hidden' = 'hidden';
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return visibilityState;
      },
    });
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise((resolve) => setTimeout(resolve));

    serverApp.instance.counterView.increase();
    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.counterView.count).not.toBe(
      serverApp.instance.counterView.count
    );

    visibilityState = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.counterView.count).toBe(
      serverApp.instance.counterView.count
    );

    visibilityState = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));

    expect(serverApp.instance.router.currentPath).toBe('/');
    serverApp.instance.router.push('/counter');
    await new Promise((resolve) => setTimeout(resolve));

    expect(clientApp.instance.router.currentPath).toBe('/');

    visibilityState = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.router.router!.location.pathname).toBe(
      '/counter'
    );
    expect(clientApp.instance.router.currentPath).toBe('/counter');
  });

  test('base SPA mode with router', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const app = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
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

    act(() => {
      app.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    let hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#replace')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(app.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#goBack')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(app.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#goForward')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    hashChange = listenHashChange();
    act(() => {
      clientContainer
        .querySelector('#go')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await hashChange;
    expect(app.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });
});

describe('base with storage and router', () => {
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

  const Link: FunctionComponent<{
    active: boolean;
    onClick: () => any;
    id?: string;
  }> = ({ active, children, onClick, id }) => {
    return (
      <div
        onClick={onClick}
        style={{ color: active ? 'red' : 'black' }}
        id={id}
      >
        {children}
      </div>
    );
  };

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
    name: 'CounterView',
  })
  class CounterView extends ViewModule {
    constructor(public counter: Counter) {
      super();
    }

    name = 'counter';

    path = '/counter';

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

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counterView: CounterView, public router: Router) {
      super();
    }

    component() {
      const currentPath = useConnector(() => this.router.currentPath);

      return (
        <>
          <ul>
            <li>
              <Link
                active={currentPath === '/'}
                onClick={() => this.router.push('/')}
                id="home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                active={currentPath === this.counterView.path}
                onClick={() => this.router.push(this.counterView.path)}
                id={this.counterView.name}
              >
                {this.counterView.name}
              </Link>
            </li>
          </ul>

          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>home</h2>
              </Route>
              <Route
                path={this.counterView.path}
                component={this.counterView.component}
              />
            </Switch>
          </div>
        </>
      );
    }
  }

  test('base server/client port mode with storage and cache routing in "Base" mode', async () => {
    const storage = new MemoryStorage({
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:Router':
        '{"_routers":"{\\"default\\":{\\"location\\":{\\"pathname\\":\\"/counter\\",\\"search\\":\\"\\",\\"hash\\":\\"\\",\\"key\\":\\"w8w2qv\\",\\"query\\":{}},\\"action\\":\\"PUSH\\"}}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        Storage,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
        {
          provide: 'EnableCacheRouting',
          useFactory: (router: Router, storage: Storage) => {
            storage.setStorage(router, {
              whitelist: ['_routers'] as any,
            });
          },
          deps: [Router, Storage],
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
    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(6);

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
      ],
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
    expect(subscribeOnServerFn.mock.calls.length).toBe(6);

    await clientApp.bootstrap(clientContainer);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(6);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('-0+');

    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(7);

    expect(serverContainer.querySelector('#content')?.textContent).toBe('-0+');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('-0+');

    act(() => {
      serverContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(6);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(9);

    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
    expect(serverContainer.querySelector('#content')?.textContent).toBe('home');
  });

  test('base server/client port mode with storage and cache routing in "SharedWorker" mode', async () => {
    const storage = new MemoryStorage({
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:Router':
        '{"_routers":"{\\"default\\":{\\"location\\":{\\"pathname\\":\\"/counter\\",\\"search\\":\\"\\",\\"hash\\":\\"\\",\\"key\\":\\"w8w2qv\\",\\"query\\":{}},\\"action\\":\\"PUSH\\"}}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
        Storage,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
        {
          provide: 'EnableCacheRouting',
          useFactory: (router: Router, storage: Storage) => {
            storage.setStorage(router, {
              whitelist: ['_routers'] as any,
            });
          },
          deps: [Router, Storage],
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
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

    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createHashHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    await clientApp.bootstrap(clientContainer);

    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(6);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(6);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('-0+');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(8);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(8);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('-0+');

    act(() => {
      clientContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await Promise.resolve();

    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });
  test('base SPA mode with storage and cache routing', async () => {
    const storage = new MemoryStorage({
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:Router':
        '{"_routers":"{\\"default\\":{\\"location\\":{\\"pathname\\":\\"/counter\\",\\"search\\":\\"\\",\\"hash\\":\\"\\",\\"key\\":\\"w8w2qv\\",\\"query\\":{}},\\"action\\":\\"PUSH\\"}}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });

    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const app = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        Storage,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
        {
          provide: 'EnableCacheRouting',
          useFactory: (router: Router, storage: Storage) => {
            storage.setStorage(router, {
              whitelist: ['_routers'] as any,
            });
          },
          deps: [Router, Storage],
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

    await Promise.resolve();

    expect(app.instance.router.currentPath).toBe('/counter');

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverContainer.querySelector('#content')?.textContent).toBe('-0+');

    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#content')?.textContent).toBe('-0+');

    act(() => {
      serverContainer
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await Promise.resolve();

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    expect(serverContainer.querySelector('#content')?.textContent).toBe('-1+');

    act(() => {
      serverContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await Promise.resolve();
    expect(serverContainer.querySelector('#content')?.textContent).toBe('home');
    expect(app.instance.router.currentPath).toBe('/');
    expect(
      app.store?.getState().Router._routers.default.location.pathname
    ).toBe('/');
  });
});

describe('SharedWorker - createMemoryHistory', () => {
  let onClientFn: jest.Mock<any, any>;
  let subscribeOnClientFn: jest.Mock<any, any>;

  let onServerFn: jest.Mock<any, any>;
  let subscribeOnServerFn: jest.Mock<any, any>;

  const Link: FunctionComponent<{
    active: boolean;
    onClick: () => any;
    id?: string;
  }> = ({ active, children, onClick, id }) => {
    return (
      <div
        onClick={onClick}
        style={{ color: active ? 'red' : 'black' }}
        id={id}
      >
        {children}
      </div>
    );
  };

  @injectable({
    name: 'counterView',
  })
  class CounterView extends ViewModule {
    constructor(private portDetector: PortDetector) {
      super();
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

    name = 'counter';

    path = '/counter';

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    component(this: CounterView) {
      const count = useConnector(() => this.count);
      return (
        <>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => delegate(this, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counterView: CounterView, public router: Router) {
      super();
    }

    component() {
      const currentPath = useConnector(() => this.router.currentPath);

      return (
        <>
          <ul>
            <li>
              <Link
                active={currentPath === '/'}
                onClick={() => this.router.push('/')}
                id="home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                active={currentPath === this.counterView.path}
                onClick={() => this.router.push(this.counterView.path)}
                id={this.counterView.name}
              >
                {this.counterView.name}
              </Link>
            </li>
          </ul>

          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>home</h2>
              </Route>
              <Route
                path={this.counterView.path}
                component={this.counterView.component}
              />
            </Switch>
          </div>
        </>
      );
    }
  }
  test('base server/client port mode with router in SharedWorker', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
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

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    await clientApp.bootstrap(clientContainer);

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });
});

describe('Worker - createMemoryHistory', () => {
  let onClientFn: jest.Mock<any, any>;
  let subscribeOnClientFn: jest.Mock<any, any>;

  let onServerFn: jest.Mock<any, any>;
  let subscribeOnServerFn: jest.Mock<any, any>;

  const Link: FunctionComponent<{
    active: boolean;
    onClick: () => any;
    id?: string;
  }> = ({ active, children, onClick, id }) => {
    return (
      <div
        onClick={onClick}
        style={{ color: active ? 'red' : 'black' }}
        id={id}
      >
        {children}
      </div>
    );
  };

  @injectable({
    name: 'counterView',
  })
  class CounterView extends ViewModule {
    constructor(private portDetector: PortDetector) {
      super();
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

    name = 'counter';

    path = '/counter';

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }

    component(this: CounterView) {
      const count = useConnector(() => this.count);
      return (
        <>
          <div id="count">{count}</div>
          <button
            id="increase"
            type="button"
            onClick={() => delegate(this, 'increase', [])}
          >
            +
          </button>
        </>
      );
    }
  }

  @injectable({
    name: 'appView',
  })
  class AppView extends ViewModule {
    constructor(public counterView: CounterView, public router: Router) {
      super();
    }

    component() {
      const currentPath = useConnector(() => this.router.currentPath);

      return (
        <>
          <ul>
            <div id="replace" onClick={() => this.router.push('/')}>
              replace
            </div>
            <div id="go" onClick={() => this.router.go(-1)}>
              go
            </div>
            <div id="goBack" onClick={() => this.router.goBack()}>
              goBack
            </div>
            <div id="goForward" onClick={() => this.router.goForward()}>
              goForward
            </div>
            <li>
              <Link
                active={currentPath === '/'}
                onClick={() => this.router.push('/')}
                id="home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                active={currentPath === this.counterView.path}
                onClick={() => this.router.push(this.counterView.path)}
                id={this.counterView.name}
              >
                {this.counterView.name}
              </Link>
            </li>
          </ul>

          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>home</h2>
              </Route>
              <Route
                path={this.counterView.path}
                component={this.counterView.component}
              />
            </Switch>
          </div>
        </>
      );
    }
  }

  test('base server/client port mode with router in SharedWorker', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
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

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    // check for default route
    expect(serverApp.instance.router.currentPath).toBe('/');

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
      },
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    // sync up router and trigger Redux update
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(4);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(4);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');
    act(() => {
      clientContainer
        .querySelector('#replace')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#goBack')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await Promise.resolve();
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#goForward')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#go')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });

  test('forcedSyncClient for server/client port mode with router in SharedWorker', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const transports = mockPairTransports();

    const serverApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'server',
        transports: {
          server: transports[0],
        },
      },
    });
    await new Promise((resolve) => setTimeout(resolve));
    // check for default route
    expect(serverApp.instance.router.currentPath).toBe('/');

    const clientApp = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
        },
      ],
      main: AppView,
      render,
      share: {
        name: 'counter',
        type: 'SharedWorker',
        port: 'client',
        transports: {
          client: transports[1],
        },
        forcedSyncClient: false,
      },
    });

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    serverApp.instance.counterView.increase();
    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.counterView.count).toBe(
      serverApp.instance.counterView.count
    );
    let visibilityState: 'visible' | 'hidden' = 'hidden';
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return visibilityState;
      },
    });
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise((resolve) => setTimeout(resolve));

    serverApp.instance.counterView.increase();
    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.counterView.count).not.toBe(
      serverApp.instance.counterView.count
    );

    visibilityState = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.counterView.count).toBe(
      serverApp.instance.counterView.count
    );

    visibilityState = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));

    expect(serverApp.instance.router.currentPath).toBe('/');
    serverApp.instance.router.push('/counter');
    await new Promise((resolve) => setTimeout(resolve));

    expect(clientApp.instance.router.currentPath).toBe('/');

    visibilityState = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise((resolve) => setTimeout(resolve));
    expect(clientApp.instance.router.router!.location.pathname).toBe(
      '/counter'
    );
    expect(clientApp.instance.router.currentPath).toBe('/counter');
  });

  test('base SPA mode with router', async () => {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

    const app = await createSharedApp({
      modules: [
        Router,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createMemoryHistory(),
          } as IRouterOptions,
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

    act(() => {
      app.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(0);
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(0);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#replace')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(app.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#goBack')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await Promise.resolve();
    expect(app.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#goForward')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(app.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#go')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(app.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });
});
