/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
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
  UserInterface,
  selector,
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
      modules: [],
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
    const getPropsFn = jest.fn();

    interface HomeView1Attrs {
      version?: string;
    }

    interface HomeView1Props {
      text: string;
    }

    @injectable()
    class HomeView1 extends View<HomeView1Props, HomeView1Attrs> {
      name = 'homeView1';

      get state() {
        return {
          count: 1,
          list: [{ count: 1 }],
          list1: [{ count: 1 }],
          test: 1,
        };
      }

      @action
      increase(num: number) {
        this.state.count += num;
      }

      @action
      decrease(num: number) {
        this.state.test -= num;
      }

      get props() {
        getPropsFn();
        return {
          text: `${this.state.count}`,
          increase: () => this.increase(1),
          sum: this.getSum(),
          sum1: this.getSum1(),
          ...this.attrs,
        };
      }

      @computed
      getSum() {
        return selector(
          () => this.state.list,
          items => {
            sumComputedFn();
            return items.reduce((sum, item) => sum + item.count, 0);
          }
        );
      }

      @computed
      getSum1() {
        return selector(
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

      component(attrs: HomeView1Attrs) {
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

    type HomeViewAttrs = HomeView1Attrs & { s?: string };
    type HomeViewProps = HomeView1Props & { e: number };

    @injectable()
    class HomeView extends HomeView1
      implements UserInterface<HomeViewProps, HomeViewAttrs> {
      name = 'homeView';

      @action
      increase(num: number) {
        super.increase(num);
        this.state.list[0].count += num;
      }

      get state() {
        return {
          // @ts-ignore
          ...super.state,
          e: 1,
        };
      }

      attrs = {} as Required<HomeViewAttrs>;

      get props() {
        return {
          text: `${this.state.count}`,
          increase: () => this.increase(1),
          sum: this.getSum(),
          sum1: this.getSum1(),
          e: this.state.e,
          ...this.attrs,
        };
      }

      @computed
      getSum() {
        return selector(
          () => super.getSum(),
          r => {
            return r + 1;
          }
        );
      }

      get defaultAttrs() {
        return {
          // @ts-ignore
          ...super.defaultAttrs,
          s: '1',
        };
      }

      component(attrs: HomeViewAttrs) {
        return super.component(attrs);
      }
    }

    interface AppViewAttrs {
      head?: JSX.Element;
      route?: JSX.Element;
    }

    @injectable()
    class AppView extends View<AppViewProps, AppViewAttrs> {
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
          ...this.attrs,
        };
      }

      component({ head, route }: AppViewAttrs) {
        return (
          <MemoryRouter>
            <h1>{this.props.bar}</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {head}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/">
                <this.homeView.component />
              </Route>
              {route}
              <Route path="/dashboard">
                <this.dashboardView.component version="0.0.1" />
              </Route>
            </Switch>
          </MemoryRouter>
        );
      }
    }

    @injectable()
    class AppView1 extends AppView {
      constructor(
        public foo: Foo,
        public homeView: HomeView,
        public dashboardView: DashboardView,
        public homeView1: HomeView1
      ) {
        super(foo, homeView, dashboardView);
      }

      component() {
        return super.component({
          head: (
            <li>
              <Link to="/homeView1">home1</Link>
            </li>
          ),
          route: (
            <Route exact path="/homeView1">
              <this.homeView1.component />
            </Route>
          ),
        });
      }
    }

    const app = createApp({
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
    expect(sumComputedFn.mock.calls.length).toBe(4);
    expect(sum1ComputedFn.mock.calls.length).toBe(1);
    expect(app.instance.homeView.props.sum).toBe(5);
    expect(sumComputedFn.mock.calls.length).toBe(4);
    expect(sum1ComputedFn.mock.calls.length).toBe(1);

    unmountComponentAtNode(container);
    container.remove();
    container = document.createElement('div');
    document.body.appendChild(container);

    const app1 = createApp({
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
    expect(renderFn.mock.calls.length).toBe(6);
    expect(sumComputedFn.mock.calls.length).toBe(6);
    expect(sum1ComputedFn.mock.calls.length).toBe(2);
    expect(app1.instance.props.sum).toBe(3);
    expect(app1.instance.state.count).toEqual(2);
    expect(app1.instance.state.list).toEqual([{ count: 2 }]);

    unmountComponentAtNode(container);
    container.remove();
    container = document.createElement('div');
    document.body.appendChild(container);

    const app2 = createApp({
      main: AppView1,
      render,
    });

    act(() => {
      app2.bootstrap(container); // init render
    });
    expect(container.querySelector('span')?.textContent).toBe('1');
    act(() => {
      app2.instance.homeView.increase(1); // render
    });
    expect(container.querySelector('span')?.textContent).toBe('2');
    act(() => {
      container
        .querySelector('#add')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('span')?.textContent).toBe('3');
    expect(app2.store.getState().homeView1.count).toBe(1);
    act(() => {
      container
        .querySelector('[href="/homeView1"]')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('span')?.textContent).toBe('1');
    act(() => {
      container
        .querySelector('#add')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('span')?.textContent).toBe('2');
    expect(app2.store.getState().homeView.count).toBe(3);
    expect(sumComputedFn.mock.calls.length).toBe(9);
    expect(sum1ComputedFn.mock.calls.length).toBe(3);
  });
});
