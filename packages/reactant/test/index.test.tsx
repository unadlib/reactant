import React, { FC } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { View, createApp, Link, Switch, Route, MemoryRouter } from '..';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

test('`View` UI module', () => {
  interface AppProps {
    bar: string;
  }

  const value = 'title about app';

  class Foo {
    bar = value;
  }

  class HomeView extends View<{ text: string }> {
    text = 'homeView';

    get props() {
      return {
        text: this.text,
      };
    }

    get component() {
      return <span>{this.text}</span>;
    }
  }

  class DashboardView extends View<{ text: string }> {
    text = 'dashboardView';

    get props() {
      return {
        text: this.text,
      };
    }

    get component() {
      return <span>{this.text}</span>;
    }
  }

  class AppView extends View<AppProps> {
    constructor(
      public foo: Foo,
      public homeView: HomeView,
      public dashboardView: DashboardView
    ) {
      super();
    }

    get props() {
      return {
        bar: this.foo.bar,
      };
    }

    get component() {
      return (
        <MemoryRouter>
          <h1>{this.foo.bar}</h1>
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
              {this.homeView.component}
            </Route>
            <Route path="/dashboard">{this.dashboardView.component}</Route>
          </Switch>
        </MemoryRouter>
      );
    }
  }

  const app = createApp({
    modules: [Foo, HomeView, DashboardView, AppView],
    main: AppView,
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
