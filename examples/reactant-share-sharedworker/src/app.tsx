import React, { useState } from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  inject,
  proxify,
  subscribe,
  PortDetector,
} from 'reactant-share';

@injectable()
export class Counter {
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
  type?: 'Server' | 'Client';

  setType?: React.Dispatch<
    React.SetStateAction<'Server' | 'Client' | undefined>
  >;

  constructor(
    @inject('counter') private counter: Counter,
    private portDetector: PortDetector
  ) {
    super();
    this.portDetector.onClient(() => {
      this.type = 'Client';
      this.setType?.(this.type);
      return subscribe(this, () => {
        console.log('client ====');
      });
    });
    this.portDetector.onServer(() => {
      this.type = 'Server';
      this.setType?.(this.type);
      return subscribe(this, () => {
        console.log('server ====');
      });
    });
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
    const [type, setType] = useState(this.type);
    this.setType = setType;
    return (
      <>
        <h2 style={{ color: type === 'Server' ? 'red' : 'green' }}>
          {`This app is a ${type}`}
        </h2>
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
