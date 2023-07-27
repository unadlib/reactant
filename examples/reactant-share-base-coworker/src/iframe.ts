import { render } from 'reactant-web';
import {
  createSharedApp,
  RouterOptions,
  createHashHistory,
  IRouterOptions,
} from 'reactant-share';
import { CounterView } from './counter.view';

createSharedApp({
  modules: [
    {
      provide: RouterOptions,
      useValue: {
        createHistory: () => createHashHistory(),
      } as IRouterOptions,
    },
  ],
  main: CounterView,
  render,
  share: {
    name: 'BaseWorkerApp',
    type: 'Base',
    workerURL: 'worker.bundle.js',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
