import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  inject,
  onClient,
  onServer,
  proxify,
  subscribe,
} from 'reactant-share';

@injectable()
export class Counter {
  constructor() {
    onClient(() =>
      subscribe(this, () => {
        console.log('client ====');
      })
    );
    onServer(() =>
      subscribe(this, () => {
        console.log('server ====');
      })
    );
  }

  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }

  @action
  decrease() {
    this.count -= 1;
  }
}

@injectable()
export class AppView extends ViewModule {
  constructor(@inject('counter') public counter: Counter) {
    super();
  }

  @proxify
  async decrease() {
    return this.counter.decrease();
  }

  @proxify
  async increase() {
    return this.counter.increase();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <>
        <button type="button" onClick={() => this.decrease()}>
          -
        </button>
        <div>{count}</div>
        <button type="button" onClick={() => this.increase()}>
          +
        </button>
      </>
    );
  }
}