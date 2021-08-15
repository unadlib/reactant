import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { Router } from 'reactant-router';
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
