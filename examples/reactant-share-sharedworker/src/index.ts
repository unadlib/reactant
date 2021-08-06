import { render } from 'reactant-web';
import { createApp } from 'reactant-share';
import { AppView, Counter } from './app';

createApp({
  modules: [{ provide: 'counter', useClass: Counter }],
  name: 'counter',
  main: { provide: 'appView', useClass: AppView },
  port: 'client',
  render,
  type: 'ShareWorker',
  typeOptions: {
    worker: 'worker.bundle.js',
  },
}).then((app) => {
  console.log(app, '====');
  app.bootstrap(document.getElementById('app'));
});
