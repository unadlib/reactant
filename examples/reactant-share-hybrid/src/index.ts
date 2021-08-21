import { render } from 'reactant-web';
import { createSharedApp, Router } from 'reactant-share';
import { AppView } from './modules/app.view';

createSharedApp({
  modules: [Router],
  main: AppView,
  render,
  share: {
    name: 'SharedApp',
    type: 'SharedTab',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
