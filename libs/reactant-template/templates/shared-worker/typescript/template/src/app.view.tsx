import React from 'react';
import { ViewModule, injectable, useConnector, spawn } from 'reactant-share';
import { CounterService } from './counter.service';

@injectable()
class AppView extends ViewModule {
  constructor(public counter: CounterService) {
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

export { AppView };
