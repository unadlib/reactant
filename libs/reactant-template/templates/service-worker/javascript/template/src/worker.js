import { createSharedApp } from 'reactant-share';
import { AppView } from './app.view';

createSharedApp({
  modules: [],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: 'ServiceWorkerApp',
    port: 'server',
    type: 'ServiceWorker',
  },
}).then((app) => {
  // renderless
});
