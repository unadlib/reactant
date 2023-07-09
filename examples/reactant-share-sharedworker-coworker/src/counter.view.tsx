import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  spawn,
} from 'reactant-share';

import { ProxyCounter } from './proxyCounter';

@injectable({
  name: 'counterView',
})
export class CounterView extends ViewModule {
  constructor(public proxyCounter: ProxyCounter) {
    super();
  }

  name = 'counter';

  path = '/counter';

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

  component(this: CounterView) {
    const [count, proxyCount] = useConnector(() => [
      this.count,
      this.proxyCounter.count,
    ]);
    return (
      <>
        <button type="button" onClick={() => spawn(this, 'decrease', [])}>
          -
        </button>
        <div>{count}</div>
        <button type="button" onClick={() => spawn(this, 'increase', [])}>
          +
        </button>
        <p>proxy in coworker</p>
        <button
          type="button"
          onClick={() => spawn(this.proxyCounter, 'decrease', [])}
        >
          -
        </button>
        <div>{proxyCount}</div>
        <button
          type="button"
          onClick={() => spawn(this.proxyCounter, 'increase', [])}
        >
          +
        </button>
      </>
    );
  }
}
