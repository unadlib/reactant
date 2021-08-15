import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  proxify,
} from 'reactant-share';

@injectable()
export class CounterView extends ViewModule {
  constructor() {
    super();
  }

  name = 'counterView';

  path = '/counter';

  @state
  count = 0;

  @action
  _increase() {
    this.count += 1;
  }

  @action
  _decrease() {
    this.count -= 1;
  }

  @proxify
  async decrease() {
    return this._decrease();
  }

  @proxify
  async increase() {
    return this._increase();
  }

  component() {
    const count = useConnector(() => this.count);
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
