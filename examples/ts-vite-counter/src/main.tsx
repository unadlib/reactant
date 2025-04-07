/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { render } from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
  computed,
} from 'reactant-share';

@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    console.log('increase0', this.count, this.doubleCount, this.doubleCount1);
    this.count += 1;
    console.log('increase1', this.count, this.doubleCount, this.doubleCount1);
  }

  @action
  decrease() {
    this.count -= 1;
  }

  @computed
  get doubleCount() {
    return this.count * 2;
  }

  @computed((that: Counter) => [that.count])
  get doubleCount1() {
    return this.count * 2;
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    const doubleCount = useConnector(() => this.counter.doubleCount);
    const doubleCount1 = useConnector(() => this.counter.doubleCount1);
    return (
      <>
        <button type="button" onClick={() => this.counter.decrease()}>
          -
        </button>
        <p>{count}</p>
        <p>{doubleCount}</p>
        <p>{doubleCount1}</p>
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
  devOptions: {
    autoComputed: true,
    checkAction: (options) => {
      console.log('checkAction', options);
    },
  },
});

app.bootstrap(document.getElementById('root'));
