# reactant

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A framework for building React web applications

### Proposal

```tsx
import React from 'react';
import {
  injectable,
  createSelector,
  createApp,
  ViewModule,
} from 'reactant';
import {
  render,
  Link,
  Switch,
  Route,
  MemoryRouter,
} from 'reactant-web';

@injectable
class Foo {}

@injectable
class Bar {}

interface HomeProps {
  text: string;
  increase(): void;
}

@injectable
class HomeView extends ViewModule<HomeProps> {
    constructor(public count: Count) {
      super();
    }

    state = {
      count: 1,
    };

    @action
    increase() {
      this.state.count += 1;
    }

    getSum = createSelector(
      () => this.state.count,
      () => this.count.state.sum,
      (number, sum) => number + sum,
    );

    get props() {
      return {
        text: `${this.getSum()}`,
        increase: () => this.increase,
      };
    }

    component() {
      return (
        <div>
          <div onClick={this.props.increase} id="add" />
          <span>{this.props.text}</span>
        </div>
      );
    }
  }

interface DashboardData {
  bar: number;
}

class DashboardView extends ViewModule<DashboardData> {
  get props() {
    return {
      bar: 1
    };
  }

  component() {
    return <span>{this.porps.bar}</span>;
  }
}

@injectable
class App {
  constructor(
    public dashboardView: DashboardView,
    public homeView: HomeView,
    public foo: Foo,
    public bar: Bar
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
}).bootstrap(document.getElementById('#app'));
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

## Tips

* `ViewModule` class `component` support inheritance, and it does not support call `super.component` for JSX Element but support call function.
* `@action` support inheritance and call `super`.
* Performance optimization: selector from `createSelector`can be passed in immutable state.

## API

### reactant

* ViewModule
* createApp
* useConnector
* @injectable
* @action
* @optional
* @inject
* @multiInject
* @multiOptional
* createSelector
* @defautlProps
* dispatch
* createState

## Todos

- [x] selector
- [x] action
- [x] multiple ViewModule instances
- [x] optimize action
- [x] @defautlProps
- [x] useConnector
- [ ] check `batch`
- [x] Enhance DI
  - [x] optional
  - [x] inject
  - [x] multi-inject
  - [x] multi-optional
- [ ] router
- [ ] storage

- [ ] mobx
- [ ] Form
- [ ] Network
- [ ] i18n
- [ ] Accessibility
- [ ] C4
- [ ] Micro Front-end
- [ ] CLI
- [ ] VSCode Plug-in
- [ ] testing
- [ ] SSR
- [ ] Hook
- [ ] Support JavaScript
- [ ] Plug-in system
