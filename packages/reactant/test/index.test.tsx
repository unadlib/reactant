/* eslint-disable class-methods-use-this */
import React, { FC } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  View,
  createApp,
  Link,
  Switch,
  Route,
  MemoryRouter,
  AppProps,
  injectable,
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

describe('base API', () => {
  interface AppViewProps {
    bar: string;
  }

  interface AppViewAttrs {
    version: string;
  }

  interface DashboardViewProps {
    version?: string;
    test?: string;
  }

  const value = 'title about app';

  @injectable()
  class Foo {
    bar = value;
  }

  @injectable()
  class DashboardView extends View<{ text: string }, DashboardViewProps> {
    text = 'dashboardView';

    get data() {
      return {
        text: this.text,
      };
    }

    get defaultProps() {
      return {
        version: '0.1.0',
        test: 'test',
      };
    }

    component(props: DashboardViewProps) {
      expect(props.version).toBe('0.0.1');
      expect(props.test).toBe('test');
      return <span>{this.data.text}</span>;
    }
  }

  test(`'View' UI module without state`, () => {
    @injectable()
    class HomeView extends View<{ text: string }> {
      text = 'homeView';

      get data() {
        return {
          text: this.text,
        };
      }

      component() {
        return <span>{this.data.text}</span>;
      }
    }

    @injectable()
    class AppView extends View<AppViewProps> {
      constructor(
        public foo: Foo,
        public homeView: HomeView,
        public dashboardView: DashboardView
      ) {
        super();
      }

      get data() {
        return {
          bar: this.foo.bar,
        };
      }

      component() {
        return (
          <MemoryRouter>
            <h1>{this.data.bar}</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/">
                <this.homeView.component />
              </Route>
              <Route path="/dashboard">
                <this.dashboardView.component version="0.0.1" />
              </Route>
            </Switch>
          </MemoryRouter>
        );
      }
    }

    const app = createApp({
      modules: [Foo, HomeView, DashboardView, AppView],
      main: AppView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    expect(container.querySelector('h1')?.innerHTML).toBe(value);
    expect(container.querySelector('span')?.textContent).toBe('homeView');
    act(() => {
      container
        .querySelector('[href="/dashboard"]')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('span')?.textContent).toBe('dashboardView');
  });

  test(`'View' UI module with state`, () => {
    @injectable()
    // eslint-disable-next-line no-shadow
    class HomeView extends View<{ text: string }> {
      state = {
        count: 1,
      };

      increase() {
        this.state.count += 1;
      }

      get data() {
        return {
          text: `${this.state.count}`,
          increase: this.increase,
        };
      }

      component() {
        return (
          <div>
            <div onClick={() => this.data.increase()} id="a" />
            <span>{this.data.text}</span>
          </div>
        );
      }
    }

    @injectable()
    class AppView extends View<AppViewProps> {
      constructor(
        public foo: Foo,
        public homeView: HomeView,
        public dashboardView: DashboardView
      ) {
        super();
      }

      get data() {
        return {
          bar: this.foo.bar,
        };
      }

      component() {
        return (
          <MemoryRouter>
            <h1>{this.data.bar}</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/">
                <this.homeView.component />
              </Route>
              <Route path="/dashboard">
                <this.dashboardView.component version="0.0.1" />
              </Route>
            </Switch>
          </MemoryRouter>
        );
      }
    }

    const app = createApp({
      modules: [Foo, HomeView, DashboardView, AppView],
      main: AppView,
      render,
    });

    act(() => {
      app.bootstrap(container);
    });
    expect(container.querySelector('span')?.textContent).toBe('1');
    act(() => {
      container
        .querySelector('[href="/dashboard"]')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  });
});
