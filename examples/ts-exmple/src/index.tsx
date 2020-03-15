import React from 'react';
import {
  render,
  BrowserRouter,
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
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
} from 'reactant';
import {
  Storage,
  StorageOptions,
  localStorage,
  IStorageOptions,
} from 'reactant-storage';
import { Router, RouterOptions, IRouterOptions } from 'reactant-router';

@injectable()
class Bar {
  state = {
    test: 'test',
  };
}

@injectable()
class Foo {
  text = 'foo';
}

@injectable()
class Count {
  constructor(public storage: Storage) {
    this.storage.setStorage(this, {
      blacklist: ['num1'],
    });
  }

  name = 'count';

  state = {
    num: 0,
    num1: 0,
  };

  @action
  increase() {
    this.state.num += 1;
  }

  @action
  increase1() {
    this.state.num1 += 1;
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
    num1: this.count.state.num1,
  });

  params?: { id?: string };

  component() {
    this.params = useParams();
    const data = useConnector(this.getData);
    return (
      <>
        <div onClick={() => this.count.increase()} id="increase">
          with persistence:
          {data.num}
        </div>
        <div onClick={() => this.count.increase1()} id="increase1">
          without persistence:
          {data.num1}
        </div>
      </>
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
    public dashboardView: DashboardView,
    public router: Router
  ) {
    super();
  }

  component() {
    const { ConnectedRouter } = this.router;
    return (
      <ConnectedRouter>
        <h1>{this.foo.text}</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/123123">Dashboard</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <this.homeView.component version="0.1.0" />
          </Route>
          <Route path="/dashboard/:id">
            <this.dashboardView.component />
          </Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}

const app = createApp({
  modules: [
    Foo,
    { provide: 'homeView', useClass: HomeView },
    {
      provide: StorageOptions,
      useValue: {
        storage: localStorage,
        loading: <div>loading</div>,
      } as IStorageOptions,
    },
    {
      provide: RouterOptions,
      useValue: {
        autoProvide: false,
      } as IRouterOptions,
    },
  ],
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('app'));

window.app = app;
