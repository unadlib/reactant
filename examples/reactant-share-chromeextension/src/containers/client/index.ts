import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { AppView, Counter } from '../app';

createSharedApp({
  modules: [{ provide: 'counter', useClass: Counter }],
  main: { provide: 'appView', useClass: AppView },
  render,
  share: {
    name: 'counter',
    port: 'client',
    type: 'BrowserExtension',
  },
}).then((app) => {
  console.log(app, '====');
  app.bootstrap(document.getElementById('app'));
});
