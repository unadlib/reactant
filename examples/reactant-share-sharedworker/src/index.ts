import { render } from 'reactant-web';
import { createApp } from 'reactant-share';
import { AppView, Counter } from './app';

createApp({
  modules: [{ provide: 'counter', useClass: Counter }],
  main: { provide: 'appView', useClass: AppView },
  render,
  share: {
    name: 'counter',
    port: 'client',
    type: 'SharedWorker',
    worker: new SharedWorker('worker.bundle.js'),
  },
}).then((app) => {
  console.log(app, '====');
  app.bootstrap(document.getElementById('app'));
});
