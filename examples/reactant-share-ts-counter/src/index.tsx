import React from 'react';
import { render } from 'reactant-web';
import {
  ViewModule,
  createApp,
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
class Counter {
  actions: any;

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
class AppView extends ViewModule {
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

createApp({
  modules: [{ provide: 'counter', useClass: Counter }],
  name: 'counter',
  main: { provide: 'appView', useClass: AppView },
  render,
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
