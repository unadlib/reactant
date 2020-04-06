import React from 'react';
import { render } from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
} from 'reactant';

@injectable()
class Counter {
  state = {
    count: 0,
  };

  @action
  increase() {
    this.state.count += 1;
  }

  @action
  decrease() {
    this.state.count -= 1;
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.state.count);
    return (
      <>
        <button type="button" onClick={() => this.counter.decrease()}>
          -
        </button>
        <div>{count}</div>
        <button type="button" onClick={() => this.counter.increase()}>
          +
        </button>
      </>
    );
  }
}

const app = createApp({
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('app'));
