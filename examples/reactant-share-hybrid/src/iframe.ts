import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { CounterView } from './modules/counter.view';

createSharedApp({
  modules: [],
  main: CounterView,
  render,
  share: {
    name: 'SharedApp',
    type: 'SharedTab',
    port: 'client',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
