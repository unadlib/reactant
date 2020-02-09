import React, { FC } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { View, createApp, Router, Link, Switch, Route } from '..';

let container: null | void | Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (typeof container === 'undefined' || container === null) {
    throw new Error(`invalid container`);
  }
  unmountComponentAtNode(container);
  container.remove();
  container = null;
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
        <Router>
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
            <Route path="/">{this.homeView.component}</Route>
            <Route path="/dashboard">{this.dashboardView.component}</Route>
          </Switch>
        </Router>
      );
    }
  }

  const app = createApp({
    modules: [Foo, HomeView, DashboardView, AppView],
    main: AppView,
  });
  act(() => {
    if (typeof container === 'undefined' || container === null) {
      throw new Error(`invalid container`);
    }
    app.bootstrap(container);
  });
  if (typeof container === 'undefined' || container === null) {
    throw new Error(`invalid container`);
  }
  expect(container.querySelector('h1')?.innerHTML).toBe(value);
  expect(container.innerHTML).toBe(
    `<h1>${value}</h1><ul><li><a href="/">Home</a></li><li><a href="/dashboard">Dashboard</a></li></ul><span>homeView</span>`
  );
});
