/* eslint-disable class-methods-use-this */
import React, { FC } from 'react';
import {
  unmountComponentAtNode,
  render,
  Link,
  Switch,
  Route,
  MemoryRouter,
} from 'reactant-web';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';
import {
  View,
  createApp,
  AppProps,
  injectable,
  action,
  createConnector,
  computed,
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

  interface DashboardViewAttrs {
    version?: string;
    test?: string;
  }

  const value = 'title about app';

  @injectable()
  class Foo0 {
    name = 'Foo0';
  }

  @injectable()
  class Foo {
    constructor(public foo0: Foo0) {}

    bar = value;
  }

  @injectable()
  class DashboardView extends View<{ text: string }, DashboardViewAttrs> {
    text = 'dashboardView';

    get props() {
      return {
        text: this.text,
        ...this.attrs,
      };
    }

    get defaultAttrs() {
      return {
        version: '0.1.0',
        test: 'test',
      };
    }

    component(attrs: DashboardViewAttrs) {
      expect(attrs.version).toBe('0.0.1');
      expect(attrs.test).toBe('test');
      return <span>{this.props.text}</span>;
    }
  }

  test('View UI module without state', () => {
    @injectable()
    class HomeView extends View<{ text: string }> {
      text = 'homeView';

      get props() {
        return {
          text: this.text,
        };
      }

      component() {
        return <span>{this.props.text}</span>;
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

      get props() {
        return {
          bar: this.foo.bar,
        };
      }

      component() {
        return (
          <MemoryRouter>
            <h1>{this.props.bar}</h1>
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

  test('View UI module with state', () => {
    const renderFn = jest.fn();
    const sumComputedFn = jest.fn();
    const sum1ComputedFn = jest.fn();

    interface HomeViewAttrs {
      version?: string;
    }

    @injectable()
    class HomeView extends View<{ text: string }, HomeViewAttrs> {
      name = 'homeView';

      state = {
        count: 1,
        list: [{ count: 1 }],
        list1: [{ count: 1 }],
        test: 1,
      };

      @action
      increase(num: number) {
        this.state.count += num;
        this.state.list[0].count += num;
      }

      @action
      decrease(num: number) {
        this.state.test -= num;
      }

      get props() {
        return {
          text: `${this.state.count}`,
          increase: () => this.increase(1),
          sum: this.sum,
          sum1: this.sum1,
          ...this.attrs,
        };
      }

      get sum() {
        return computed(
          () => this.state.list,
          items => {
            sumComputedFn();
            return items.reduce((sum, item) => sum + item.count, 0);
          }
        );
      }

      get sum1() {
        return computed(
          () => this.state.list1,
          items => {
            sum1ComputedFn();
            return items.reduce((sum, item) => sum + item.count, 0);
          }
        );
      }

      get defaultAttrs() {
        return {
          version: '0.0.1',
        };
      }

      component(attrs: HomeViewAttrs) {
        renderFn();
        expect(this.props.version).toEqual(this.attrs.version);
        expect(this.props.version).toEqual(this.defaultAttrs.version);
        return (
          <div>
            <div onClick={this.props.increase} id="add" />
            <span>{this.props.text}</span>
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

      get props() {
        return {
          bar: this.foo.bar,
        };
      }

      component() {
        return (
          <MemoryRouter>
            <h1>{this.props.bar}</h1>
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
      app.bootstrap(container); // init render
    });
    expect(container.querySelector('span')?.textContent).toBe('1');
    const { list } = app.store.getState().homeView;
    act(() => {
      app.instance.homeView.increase(1); // render
    });
    expect(app.store.getState().homeView.count).toBe(2);
    expect(app.instance.homeView.state.count).toBe(2);
    expect(list === app.store.getState().homeView.list).toBeFalsy();
    expect(list[0] === app.store.getState().homeView.list[0]).toBeFalsy();
    expect(container.querySelector('span')?.textContent).toBe('2');
    act(() => {
      app.instance.homeView.increase(1); // render
    });
    act(() => {
      app.instance.homeView.decrease(1);
    });
    expect(renderFn.mock.calls.length).toBe(3);
    act(() => {
      container
        .querySelector('#add')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('span')?.textContent).toBe('4');

    unmountComponentAtNode(container);
    container.remove();
    container = document.createElement('div');
    document.body.appendChild(container);

    const app1 = createApp({
      modules: [Foo, HomeView, DashboardView, AppView],
      main: HomeView,
      render,
    });

    act(() => {
      app1.bootstrap(container); // init render
    });

    expect(container.querySelector('span')?.textContent).toBe('1');
    act(() => {
      container
        .querySelector('#add')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('span')?.textContent).toBe('2');
    expect(sumComputedFn.mock.calls.length).toBe(6);
    expect(sum1ComputedFn.mock.calls.length).toBe(2);
  });
});
