import React from 'react';
import { render } from 'react-dom';
import { injectable, createApp, ViewModule, action, useConnector, state } from 'reactant';
import './index.css';
import AppView from './App';
import * as serviceWorker from './serviceWorker';

@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }

  get test() {
    return 'test';
  }
}

@injectable({
  deps: [{ provide: 'AppView' }, { provide: 'Counter' }],
})
class CounterView extends ViewModule {
  constructor(appView, counter) {
    super();
    this.appView = appView;
    this.counter = counter;
  }

  component() {
    const count = useConnector(() => this.counter.count)
    return <this.appView count={count} increase={() => this.counter.increase()} />;
  }
}

@injectable({
  deps: [{ provide: 'CounterView' }],
})
class App extends ViewModule {
  constructor(counterView) {
    super();
    this.counterView = counterView;
  }

  component() {
    return <this.counterView.component />;
  }
}

const app = createApp({
  modules: [
    { provide: 'CounterView', useClass: CounterView },
    { provide: 'AppView', useValue: AppView },
    { provide: 'Counter', useClass: Counter },
  ],
  main: App,
  render,
});

window.app = app;

app.bootstrap(document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
