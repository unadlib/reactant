/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  render,
  unmountComponentAtNode,
  Switch,
  Route,
  MemoryRouter,
  Link,
} from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  inject,
  optional,
  useConnector,
  defaultProps,
  action,
  createSelector,
} from '../../src/public-api';

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
  test('ViewModule without state', () => {
    @injectable()
    class Bar {
      name = 'bar';

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

      state = {
        num: 0,
      };

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

      getSum = createSelector(
        () => this.count.state.num,
        num => num + 1
      );

      getData = () => ({
        num: this.getSum(),
        increase: () => this.count.increase(),
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

    let app = createApp({
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

    const preloadedState = app.store.getState();
    // reload and keep state with new deps.
    app = createApp({
      modules: [Foo, { provide: 'homeView', useClass: HomeView }, Bar],
      main: AppView,
      render,
      preloadedState,
    });
    act(() => {
      app.bootstrap(container);
    });
    act(() => {
      container
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(app.instance.bar.state.test).toBe('test');
    expect(container.querySelector('#increase')?.textContent).toBe('3');
  });
});
