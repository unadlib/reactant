/* eslint-disable max-classes-per-file */
import React, { FC } from 'react';
import { add } from 'reactant-module';
import {
  View,
  Router,
  Link,
  injectable,
  inject,
  computed,
  createApp,
  View,
  connect,
} from '../src';

test('base App', () => {
  @injectable
  class Foo {}

  @injectable
  class Bar {}

  interface HomeProps {
    a: number;
  }

  @injectable
  class HomeView extends View<HomeProps> {
    a = 1;

    getProps() {
      return {
        a: this.a,
      };
    }

    component({ a }) {
      return <span>{a}</span>
    }
  }

  interface DashboardProps {
    b: string;
  }

  class DashboardView extends View<DashboardProps> {
    b = '1';

    getProps() {
      return {
        b: this.b,
      };
    }

    component({ b }) {
      return <span>{b}</span>;
    }
  }

  @injectable
  class App {
    // eslint-disable-next-line no-useless-constructor
    constructor(
      @inject dashboardView: DashboardView,
      @inject homeView: HomeView,
      @inject foo: Foo,
      @inject bar: Bar
    ) {}

    component() {
      const Home = this.homeView.component;
      const Dashboard = this.dashboardView.component;
      return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Topics</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }

  const app = createApp({
    modules: [HomeView, DashboardView, Foo, Bar, App],
    main: App,
  });

  app.bootstrap(document.getElementById('#app'));
});
