/* eslint-disable no-restricted-globals */
import { createSharedApp, Router } from 'reactant-share';
import { AppView } from './app.view';

createSharedApp({
  modules: [Router],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: 'SharedWorkerApp',
    port: 'server',
    type: 'SharedWorker',
  },
}).then((app) => {
  console.log(app, '====');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (self as any).app = app;
});
