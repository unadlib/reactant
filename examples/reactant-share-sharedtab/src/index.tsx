import React from 'react';
import { render } from 'reactant-web';
import {
  ViewModule,
  createSharedApp,
  injectable,
  useConnector,
  action,
  state,
  spawn,
  subscribe,
  PortDetector,
} from 'reactant-share';

@injectable({
  name: 'counter',
})
class Counter {
  constructor(private portDetector: PortDetector) {
    this.portDetector.onClient(() => {
      console.log('client ====');
      return subscribe(this, () => {
        console.log('===> client subscribe');
      });
    });
    this.portDetector.onServer(() => {
      console.log('server ====');
      return subscribe(this, () => {
        console.log('===> server subscribe');
      });
    });
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

@injectable({
  name: 'appView',
})
class AppView extends ViewModule {
  constructor(public counter: Counter) {
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

createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: 'counter',
    type: 'SharedTab',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
