import React from 'react';

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

import logo from './logo.svg';
import './App.css';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
