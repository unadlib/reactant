/* eslint-disable max-classes-per-file */
import React, { FC } from 'react';
import { add } from 'reactant-module';
import {
  View,
  Router,
  injectable,
  inject,
  computed,
  createApp,
  View,
} from '../src';

test('base App', () => {
  @injectable
  class Foo {}

  @injectable
  class Bar {}

  class App {}

  interface HomeProps {
    a: number;
  }

  class HomeView extends View<HomeProps> {
    a = 1;

    getProps() {
      return {
        a: this.a,
      };
    }
  }

  const Home: FC<HomeProps> = ({ a }) => <span>{a}</span>;

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

  const Dashboard: FC<DashboardProps> = ({ b }) => <span>{b}</span>;

  const app = createApp({
    views: [HomeView, DashboardView],
    modules: [Foo, Bar],
  });

  const AppContainer = () => (
    <div>
      <Logo />
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
