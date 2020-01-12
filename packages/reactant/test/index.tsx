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
  }

  const Home = connect(HomeView)(({ a }) => <span>{a}</span>);

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
  }

  const Dashboard = connect(DashboardView)(({ b }) => <span>{b}</span>);

  @injectable
  class App {
    // constructor(
    //   @inject dashboardView: DashboardView,
    //   @inject homeView: HomeView,
    //   @inject foo: Foo,
    //   @inject bar: Bar
    // ) {}
  }

  const app = createApp({
    modules: [HomeView, DashboardView, Foo, Bar],
    main: App,
  });

  const AppContainer = () => (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <Router>
        <Home path="/" />
        <Dashboard path="dashboard" />
      </Router>
    </div>
  );

  app.bootstrap(AppContainer, document.getElementById('#app'));
});
