# reactant

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A framework for building React web applications

### Proposal

```tsx
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
} from 'reactant';

test('base App', () => {
  @injectable
  class Foo {}

  @injectable
  class Bar {}

  interface HomeProps {
    a: number;
  }

  @injectable
  class HomeView extends View<{ text: string }> {
      constructor(public count: Count) {
        super();
      }

      state = {
        count: 1,
      };

      @action
      increase() {
        const count = this.state.count + 1;
        return {
            ...this.state,
            count,
          };
      }

      @computed(
        o => o.state.count,
        o => o.count.state.sum,
      )
      get sum(number, sum) {
        return number + sum;
      }

      get data() {
        return {
          text: `${this.state.count}`,
          increase: () => this.increase,
        };
      }

      component() {
        return (
          <div>
            <div onClick={this.data.increase} id="add" />
            <span>{this.data.text}</span>
          </div>
        );
      }
    }

  interface DashboardData {
    b: string;
  }

  class DashboardView extends View<DashboardData> {
    b = '1';

    get props() {
      return {
        b: this.b,
      };
    }

    component() {
      return <span>{this.porps.b}</span>;
    }
  }

  @injectable
  class App {
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
                <Link to="/dashboard">Dashboard</Link>
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
```

## Goal

* Immutable
* Easy
* High-performance
* Flexible

## Libraries

* react
* redux
* react-router
* inversify
