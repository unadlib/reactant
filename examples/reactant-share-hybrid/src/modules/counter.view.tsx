import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  spawn,
} from 'reactant-share';

@injectable({
  name: 'counterView',
})
export class CounterView extends ViewModule {
  constructor() {
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
    const count = useConnector(() => this.count);
    return (
      <>
        <button type="button" onClick={() => spawn(this, 'decrease', [])}>
          -
        </button>
        <div>{count}</div>
        <button type="button" onClick={() => spawn(this, 'increase', [])}>
          +
        </button>
      </>
    );
  }
}
