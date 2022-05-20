/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FunctionComponent } from 'react';
import { unmountComponentAtNode, render, Switch, Route } from 'reactant-web';
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
  Router,
  mockPairTransports,
  IRouterOptions,
  createBrowserHistory,
  RouterOptions,
  createHashHistory,
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
            onClick={() => spawn(this, 'increase', [])}
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
    act(() => {
      serverApp.bootstrap(serverContainer);
    });

    await new Promise((resolve) => setTimeout(resolve));

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
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(1);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      serverContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(5);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(2);
    expect(serverContainer.querySelector('#content')?.textContent).toBe('0+');
    // expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');
    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(7);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(3);

    expect(serverContainer.querySelector('#content')?.textContent).toBe('0+');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
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
            onClick={() => spawn(this, 'increase', [])}
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
    expect(subscribeOnClientFn.mock.calls.length).toBe(0);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);

    act(() => {
      clientApp.bootstrap(clientContainer);
    });

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#home')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');
  });
});

describe('ServiceWorker', () => {
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
            onClick={() => spawn(this, 'increase', [])}
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

  test('base server/client port mode with router in ServiceWorker', async () => {
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
        type: 'ServiceWorker',
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
        type: 'ServiceWorker',
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
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(1);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(onClientFn.mock.calls.length).toBe(1);
    expect(subscribeOnClientFn.mock.calls.length).toBe(2);
    expect(onServerFn.mock.calls.length).toBe(1);
    expect(subscribeOnServerFn.mock.calls.length).toBe(0);
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#replace')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((resolve) => setTimeout(resolve));
    expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#counter')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((resolve) => setTimeout(resolve));
    expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#goBack')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((resolve) => setTimeout(resolve));
    // todo: mock
    // expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');

    act(() => {
      clientContainer
        .querySelector('#goForward')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((resolve) => setTimeout(resolve));
    // todo: mock
    // expect(serverApp.instance.router.currentPath).toBe('/');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('home');

    act(() => {
      clientContainer
        .querySelector('#go')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await new Promise((resolve) => setTimeout(resolve));
    // todo: mock
    // expect(serverApp.instance.router.currentPath).toBe('/counter');
    expect(clientContainer.querySelector('#content')?.textContent).toBe('0+');
  });
});
