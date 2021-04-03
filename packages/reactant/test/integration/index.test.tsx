/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  unmountComponentAtNode,
  render,
  Link,
  Switch,
  Route,
  MemoryRouter,
} from 'reactant-web';
import { act } from 'react-dom/test-utils';
import {
  ViewModule,
  createApp,
  injectable,
  action,
  createState,
  computed,
  useConnector,
  dispatch,
  ReactantAction,
  defaultProps,
  batch,
  state,
  optional,
  inject,
  autobind,
  identifierKey,
} from '../..';

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

  interface AppViewProps {
    version: string;
  }

  interface DashboardViewProps {
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
  class DashboardView extends ViewModule {
    text = 'dashboardView';

    getProps() {
      return {
        text: this.text,
      };
    }

    @defaultProps({
      version: '0.1.0',
      test: 'test',
    })
    component(props: DashboardViewProps) {
      // check merge props with default props.
      expect(props.version).toBe('0.0.1');
      expect(props.test).toBe('test');
      const data = this.getProps();
      return <span>{data.text}</span>;
    }
  }

  test('ViewModule without state', () => {
    @injectable()
    class HomeView extends ViewModule {
      text = 'homeView';

      getProps() {
        return {
          text: this.text,
        };
      }

      component() {
        const data = this.getProps();
        return <span>{data.text}</span>;
      }
    }

    @injectable()
    class AppView extends ViewModule {
      constructor(
        public foo: Foo,
        public homeView: HomeView,
        public dashboardView: DashboardView
      ) {
        super();
      }

      getProps() {
        return {
          bar: this.foo.bar,
        };
      }

      component() {
        const data = this.getProps();
        return (
          <MemoryRouter>
            <h1>{data.bar}</h1>
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

  test('ViewModule with state', () => {
    const renderFn = jest.fn();
    const sumComputedFn = jest.fn();
    const sum1ComputedFn = jest.fn();
    const getPropsFn = jest.fn();

    interface HomeView1Props {
      version?: string;
      text?: string;
    }

    const a = {
      count: 1,
      list: [{ count: 1 }],
      list1: [{ count: 1 }],
      test: 1,
    };

    @injectable()
    class HomeView1 extends ViewModule {
      name = 'homeView1';

      @state
      state: typeof a = a;

      @action
      increase(num: number) {
        this.state.count += num;
      }

      @action
      decrease(num: number) {
        this.state.test -= num;
      }

      getProps() {
        getPropsFn();
        return {
          text: `${this.state.count}`,
          sum: this.sum,
          sum1: this.sum1,
        };
      }

      @computed((that: HomeView1) => [that.state.list])
      get sum() {
        sumComputedFn();
        return this.state.list.reduce((sum, item) => sum + item.count, 0);
      }

      @computed((that: HomeView1) => [that.state.list1])
      get sum1() {
        sum1ComputedFn();
        return this.state.list1.reduce((sum, item) => sum + item.count, 0);
      }

      component(props: HomeView1Props) {
        const data = useConnector(() => this.getProps());
        renderFn();
        return (
          <div>
            <div onClick={() => this.increase(1)} id="add" />
            <span>{data.text}</span>
          </div>
        );
      }
    }

    type HomeViewProps = HomeView1Props & { s?: string };

    @injectable()
    class HomeView extends HomeView1 {
      name = 'homeView';

      @action
      increase(num: number) {
        super.increase(num);
        this.state.list[0].count += num;
      }

      @action
      increase1() {
        this.state.list1[0].count += 1;
      }

      @state
      state: typeof a & { e: number } = {
        ...this.state,
        e: 1,
      };

      get props() {
        return {
          text: `${this.state.count}`,
          increase: () => this.increase(1),
          sum: this._sum,
          sum1: this.sum1,
          e: this.state.e,
        };
      }

      @computed(({ sum }: HomeView) => [sum])
      get _sum() {
        return this.sum + 1;
      }

      component(props: HomeViewProps) {
        return super.component(props);
      }
    }

    interface AppViewProps {
      head?: JSX.Element;
      route?: JSX.Element;
    }

    @injectable()
    class AppView extends ViewModule {
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

      component({ head, route }: AppViewProps) {
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
    const { list } = app.store!.getState().homeView.state;
    act(() => {
      app.instance.homeView.increase(1); // render
    });
    expect(app.store!.getState().homeView.state.count).toBe(2);
    expect(app.instance.homeView.state.count).toBe(2);
    expect(list === app.store!.getState().homeView.state.list).toBeFalsy();
    expect(
      list[0] === app.store!.getState().homeView.state.list[0]
    ).toBeFalsy();
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
    expect(app1.instance.sum1).toBe(1);
    expect(sum1ComputedFn.mock.calls.length).toBe(2);
    app1.instance.increase1();
    expect(app1.instance.sum1).toBe(2);
    expect(sum1ComputedFn.mock.calls.length).toBe(3);
    expect(app1.instance.sum1).toBe(2);
    expect(sum1ComputedFn.mock.calls.length).toBe(3);
    expect(app1.instance.props.sum).toBe(3);
    expect(app1.instance.state.count).toEqual(2);
    expect(app1.instance.state.list).toEqual([{ count: 2 }]);
    expect(app1.instance.state.e).toEqual(1);
    expect(app1.store!.getState().homeView.state.e).toEqual(1);

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
    expect(app2.store!.getState().homeView1.state.count).toBe(1);
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
    expect(app2.store!.getState().homeView.state.count).toBe(3);
    expect(sumComputedFn.mock.calls.length).toBe(10);
    expect(app2.instance.homeView.sum1).toBe(1);
    expect(sum1ComputedFn.mock.calls.length).toBe(5);
    expect(app2.instance.homeView.sum1).toBe(1);
    expect(sum1ComputedFn.mock.calls.length).toBe(5);
    app2.instance.homeView.increase1();
    expect(app2.instance.homeView.sum1).toBe(2);
    expect(sum1ComputedFn.mock.calls.length).toBe(6);
  });

  test('ViewModule dispatch when subclassing', () => {
    const renderFn = jest.fn();

    @injectable()
    class HomeView1 extends ViewModule {
      // name = 'homeView';
      @state
      list = createState<{ count: number }[], ReactantAction>(
        // eslint-disable-next-line no-shadow
        (_state = [{ count: 1 }], { type, state }) =>
          type === (this as any)[identifierKey]
            ? state[(this as any)[identifierKey]!].list
            : _state
      );

      @state
      count = 1;

      @state
      count1 = 1;

      increase() {
        dispatch(this, {
          state: {
            list: [
              {
                count: this.list![0].count + 1,
              },
              ...this.list!.slice(1, -1),
            ],
          },
        });
      }

      @action
      add() {
        this.count += 1;
      }

      @action
      add1() {
        this.count1 += 1;
      }

      getData = () => ({
        text: this.list![0].count,
        count1: this.count1,
      });

      @defaultProps({
        version: '0.1.0',
        test: 'test',
      })
      component(props: { version?: string; test?: string }) {
        const data = useConnector(this.getData);
        renderFn(props);
        return (
          <div>
            <div onClick={() => this.increase()} id="add" />
            <span>{data.text}</span>
          </div>
        );
      }
    }

    @injectable()
    class HomeView extends HomeView1 {
      increase() {
        super.increase();
        dispatch(this, {
          state: {
            list: [
              {
                count: this.list![0].count + 1,
              },
              ...this.list!.slice(1, -1),
            ],
          },
        });
      }
    }

    const app = createApp({
      modules: [],
      main: HomeView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    const reduxEvent = jest.fn();
    app.store!.subscribe(() => {
      reduxEvent();
    });
    expect(container.textContent).toBe('1');
    act(() => {
      container
        .querySelector('#add')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.textContent).toBe('3');
    act(() => {
      app.instance.add();
    });
    act(() => {
      app.instance.add();
    });
    expect(renderFn.mock.calls.length).toEqual(2);
    expect(reduxEvent.mock.calls.length).toEqual(4);
    batch(() => {
      act(() => {
        app.instance.add1();
      });
      act(() => {
        app.instance.add1();
      });
      act(() => {
        app.instance.add1();
      });
    });
    expect(renderFn.mock.calls.length).toEqual(3);
    expect(reduxEvent.mock.calls.length).toEqual(7);
  });
});

describe('multiple reactant app', () => {
  test('ViewModule with state, multiple reactant app instances', () => {
    @injectable()
    class Bar {
      name = 'bar';

      @state
      state = {
        test: 'test',
      };
    }

    @injectable()
    class Foo {
      name = 'foo';
    }

    @injectable()
    class Count {
      name = 'count';

      @state
      state = {
        num: 0,
      };

      @autobind
      @action
      increase() {
        this.state.num += 1;
      }
    }

    @injectable()
    class DashboardView extends ViewModule {
      constructor(public count: Count) {
        super();
      }

      @computed(({ count }: DashboardView) => [count.state.num])
      get sum() {
        return this.count.state.num + 1;
      }

      getData = () => ({
        num: this.sum,
        increase: this.count.increase,
      });

      component() {
        const data = useConnector(this.getData);
        return (
          <div onClick={data.increase} id="increase">
            {data.num}
          </div>
        );
      }
    }
    @injectable()
    class HomeView extends ViewModule {
      text = 'app';

      getProps(version: string) {
        return {
          version: `${this.text} v${version}`,
        };
      }

      @defaultProps({
        version: '0.0.1',
      })
      component(props: { version?: string }) {
        const data = useConnector(() => this.getProps(props.version!));
        return <span id="version">{data.version}</span>;
      }
    }

    @injectable()
    class AppView extends ViewModule {
      constructor(
        @optional() public foo: Foo,
        @optional() public bar: Bar,
        @inject('homeView') public homeView: InstanceType<typeof HomeView>,
        public dashboardView: DashboardView
      ) {
        super();
      }

      component() {
        return (
          <>
            <div id="foo">{this.foo.name}</div>
            <this.homeView.component version="0.1.0" />
            <this.dashboardView.component />
          </>
        );
      }
    }

    const app = createApp({
      modules: [Foo, { provide: 'homeView', useClass: HomeView }],
      main: AppView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    expect(container.querySelector('#foo')?.textContent).toBe('foo');
    expect(container.querySelector('#increase')?.textContent).toBe('1');
    expect(container.querySelector('#version')?.textContent).toBe('app v0.1.0');
    act(() => {
      container
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('#increase')?.textContent).toBe('2');
    expect(app.instance.bar).toBeUndefined();

    // Multiple reactant app instances

    const preloadedState = app.store!.getState();
    // reload and keep state with new deps.
    const container1 = document.createElement('div');
    document.body.appendChild(container1);

    const app1 = createApp({
      modules: [Foo, { provide: 'homeView', useClass: HomeView }, Bar],
      main: AppView,
      render,
      preloadedState,
    });
    act(() => {
      app1.bootstrap(container1);
    });
    act(() => {
      container1
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(app1.instance.bar.state.test).toBe('test');
    expect(container1.querySelector('#increase')?.textContent).toBe('3');

    // Multiple reactant app instances about app.
    act(() => {
      container
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('#increase')?.textContent).toBe('3');
  });
});
