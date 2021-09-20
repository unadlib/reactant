import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  inject,
  spawn,
  subscribe,
  PortDetector,
} from 'reactant-share';

@injectable()
export class Counter {
  constructor(private portDetector: PortDetector) {
    this.portDetector.onClient(() =>
      subscribe(this, () => {
        console.log('client ====');
      })
    );
    this.portDetector.onServer(() =>
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

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <>
        <button
          type="button"
          onClick={() => spawn(this.counter, 'decrease', [])}
        >
          -
        </button>
        <div>{count}</div>
        <button
          type="button"
          onClick={() => spawn(this.counter, 'increase', [])}
        >
          +
        </button>
      </>
    );
  }
}
