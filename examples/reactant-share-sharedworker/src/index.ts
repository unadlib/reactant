import { render } from 'reactant-web';
import {
  createSharedApp,
  Router,
  Storage,
  StorageOptions,
  IStorageOptions,
} from 'reactant-share';
import localForage from 'localforage';
import { AppView } from './app.view';

createSharedApp({
  modules: [
    Router,
    Storage,
    {
      provide: StorageOptions,
      useValue: {
        storage: localForage,
        loading: 'loading',
      } as IStorageOptions,
    },
  ],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    port: 'client',
    type: 'SharedWorker',
    sharedWorkerURL: 'worker.bundle.js',
  },
}).then((app) => {
  console.log(app, '====');
  app.bootstrap(document.getElementById('app'));
  (window as any).app = app;
});
