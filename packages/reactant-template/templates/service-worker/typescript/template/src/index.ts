import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { AppView } from './app.view';

createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: 'ServiceWorkerApp',
    port: 'client',
    type: 'ServiceWorker',
    workerURL: 'worker.bundle.js',
  },
}).then((app) => {
  app.bootstrap(document.getElementById('app'));
});
