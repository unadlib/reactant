import { createSharedApp } from 'reactant-share';
import { AppView } from './app.view';

// follow issue: https://github.com/microsoft/TypeScript/issues/20595
// workaround: `tsc --skipLibCheck`.
declare var self: ServiceWorkerGlobalScope;

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
