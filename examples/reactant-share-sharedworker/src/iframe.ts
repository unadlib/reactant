import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { CounterView } from './counter.view';

createSharedApp({
  modules: [],
  main: CounterView,
  render,
  share: {
    name: 'SharedWorkerApp',
    port: 'client',
    type: 'SharedWorker',
    sharedWorkerURL: 'worker.bundle.js',
  },
}).then((app) => {
  console.log(app, '====');
  (window as any).app = app;
  app.bootstrap(document.getElementById('app'));
});
