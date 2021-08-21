import { render } from 'reactant-web';
import { createSharedApp, Router } from 'reactant-share';
import { AppView } from './app.view';

createSharedApp({
  modules: [Router],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    port: 'client',
    type: 'SharedWorker',
    sharedWorkerURL: 'worker.bundle.js',
  },
}).then((app) => {
  console.log(app, '====');
  app.bootstrap(document.getElementById('app'));
  (window as any).app = app;
});
