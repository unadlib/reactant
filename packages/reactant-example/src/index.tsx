import React from 'react';
import { render } from 'reactant-web';
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

  component() {
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
    public dashboardView: DashboardView
  ) {
    super();
  }

  component() {
    return (
      <>
        <div id="foo">{this.foo.text}</div>
        <this.homeView.component version="0.1.0" />
        <this.dashboardView.component />
      </>
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
  ],
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('app'));
