/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';

import {
  unmountComponentAtNode,
  render,
  Link,
  Switch,
  Route,
} from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';
import {
  Router,
  RouterOptions,
  IRouterOptions,
  createBrowserHistory,
} from '..';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

test('`router` module without auto provider', () => {
  @injectable()
  class Count {
    @state
    num = 0;

    @action
    increase() {
      this.num += 1;
    }
  }

  @injectable()
  class DashboardView extends ViewModule {
    constructor(public count: Count) {
      super();
    }

    component() {
      const num = useConnector(() => this.count.num);
      return (
        <div onClick={() => this.count.increase()} id="increase">
          {num}
        </div>
      );
    }
  }
  @injectable()
  class HomeView extends ViewModule {
    text = 'app';

    getProps(version: string) {
      return {
        version: `${this.text} v${version}`,
      };
    }

    component({ version = '0.0.1' }) {
      const data = useConnector(() => this.getProps(version));
      return <span id="version">{data.version}</span>;
    }
  }

  @injectable()
  class AppView extends ViewModule {
    constructor(
      public homeView: HomeView,
      public dashboardView: DashboardView,
      public router: Router
    ) {
      super();
    }

    component() {
      const { ConnectedRouter } = this.router;
      return (
        <ConnectedRouter>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/123123">Dashboard</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <this.homeView.component version="0.1.0" />
            </Route>
            <Route path="/dashboard/:id">
              <this.dashboardView.component />
            </Route>
          </Switch>
        </ConnectedRouter>
      );
    }
  }

  const app = createApp({
    modules: [
      {
        provide: RouterOptions,
        useValue: {
          autoProvide: false,
        } as IRouterOptions,
      },
    ],
    main: AppView,
    render,
    devOptions: {
      reduxDevTools: true,
    },
  });
  act(() => {
    app.bootstrap(container);
  });
  expect(container.textContent).toBe('HomeDashboardapp v0.1.0');
  act(() => {
    container
      .querySelector('[href="#/dashboard/123123"]')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(container.textContent).toBe('HomeDashboard0');
  expect(window.location.href).toEqual('http://localhost/#/dashboard/123123');
  act(() => {
    container
      .querySelector('[href="#/"]')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
});

test('`router` module with auto provider with default history', () => {
  @injectable()
  class Count {
    @state
    num = 0;

    @action
    increase() {
      this.num += 1;
    }
  }

  @injectable()
  class DashboardView extends ViewModule {
    constructor(public count: Count) {
      super();
    }

    component() {
      const num = useConnector(() => this.count.num);
      return (
        <div onClick={() => this.count.increase()} id="increase">
          {num}
        </div>
      );
    }
  }
  @injectable()
  class HomeView extends ViewModule {
    text = 'app';

    getProps(version: string) {
      return {
        version: `${this.text} v${version}`,
      };
    }

    component({ version = '0.0.1' }) {
      const data = useConnector(() => this.getProps(version));
      return <span id="version">{data.version}</span>;
    }
  }

  @injectable()
  class AppView extends ViewModule {
    constructor(
      public homeView: HomeView,
      public dashboardView: DashboardView,
      public router: Router
    ) {
      super();
    }

    component() {
      const { ConnectedRouter } = this.router;
      return (
        <>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/123123">Dashboard</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <this.homeView.component version="0.1.0" />
            </Route>
            <Route path="/dashboard/:id">
              <this.dashboardView.component />
            </Route>
          </Switch>
        </>
      );
    }
  }

  const app = createApp({
    main: AppView,
    render,
    devOptions: {
      reduxDevTools: true,
    },
  });
  const routeFn = jest.fn();
  // eslint-disable-next-line no-unused-expressions
  app.store?.subscribe(() => {
    routeFn(app.store?.getState());
  });
  act(() => {
    app.bootstrap(container);
  });
  expect(container.textContent).toBe('HomeDashboardapp v0.1.0');
  expect(routeFn.mock.calls[0][0].router.location.pathname).toEqual('/');
  expect(routeFn.mock.calls[0][0].router.location.pathname).toBe(
    app.instance.router.currentPath
  );
  act(() => {
    container
      .querySelector('[href="#/dashboard/123123"]')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(routeFn.mock.calls[1][0].router.location.pathname).toEqual(
    '/dashboard/123123'
  );
  expect(routeFn.mock.calls[1][0].router.location.pathname).toBe(
    app.instance.router.currentPath
  );
  expect(container.textContent).toBe('HomeDashboard0');
});

test('`router` module with auto provider with createBrowserHistory', async () => {
  @injectable()
  class Count {
    @state
    num = 0;

    @action
    increase() {
      this.num += 1;
    }
  }

  @injectable()
  class DashboardView extends ViewModule {
    constructor(public count: Count) {
      super();
    }

    component() {
      const num = useConnector(() => this.count.num);
      return (
        <div onClick={() => this.count.increase()} id="increase">
          {num}
        </div>
      );
    }
  }
  @injectable()
  class HomeView extends ViewModule {
    text = 'app';

    getProps(version: string) {
      return {
        version: `${this.text} v${version}`,
      };
    }

    component({ version = '0.0.1' }) {
      const data = useConnector(() => this.getProps(version));
      return <span id="version">{data.version}</span>;
    }
  }

  @injectable()
  class AppView extends ViewModule {
    constructor(
      public homeView: HomeView,
      public dashboardView: DashboardView,
      public router: Router
    ) {
      super();
    }

    component() {
      const { ConnectedRouter } = this.router;
      return (
        <>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/123123">Dashboard</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <this.homeView.component version="0.1.0" />
            </Route>
            <Route path="/dashboard/:id">
              <this.dashboardView.component />
            </Route>
          </Switch>
        </>
      );
    }
  }

  const app = createApp({
    main: AppView,
    modules: [
      {
        provide: RouterOptions,
        useValue: {
          history: createBrowserHistory(),
        } as IRouterOptions,
      },
    ],
    render,
    devOptions: {
      reduxDevTools: true,
    },
  });
  const routeFn = jest.fn();
  // eslint-disable-next-line no-unused-expressions
  app.store?.subscribe(() => {
    routeFn(app.store?.getState());
  });
  act(() => {
    app.bootstrap(container);
  });
  expect(container.textContent).toBe('HomeDashboardapp v0.1.0');
  expect(routeFn.mock.calls[0][0].router.location.pathname).toEqual('/');
  expect(routeFn.mock.calls[0][0].router.location.pathname).toBe(
    app.instance.router.currentPath
  );

  act(() => {
    container
      .querySelector('[href="/dashboard/123123"]')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(routeFn.mock.calls[1][0].router.location.pathname).toEqual(
    '/dashboard/123123'
  );
  expect(routeFn.mock.calls[1][0].router.location.pathname).toBe(
    app.instance.router.currentPath
  );
  expect(container.textContent).toBe('HomeDashboard0');
});
