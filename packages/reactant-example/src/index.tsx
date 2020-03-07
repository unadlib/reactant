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
  });

  component() {
    const data = useConnector(this.getData);
    return (
      <div onClick={() => this.count.increase()} id="increase">
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
        <div id="foo">{this.foo.text}</div>
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

app.bootstrap(document.getElementById('app'));
