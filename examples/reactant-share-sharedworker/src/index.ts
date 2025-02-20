import { render } from 'reactant-web';
import {
  createSharedApp,
  Router,
  Storage,
  StorageOptions,
  IStorageOptions,
  RouterOptions,
  createHashHistory,
  IRouterOptions,
} from 'reactant-share';
import localForage from 'localforage';
import { AppView } from './app.view';

createSharedApp({
  modules: [
    Router,
    {
      provide: RouterOptions,
      useValue: {
        createHistory: () => createHashHistory(),
      } as IRouterOptions,
    },
    Storage,
    {
      provide: StorageOptions,
      useValue: {
        storage: localForage,
        loading: 'loading',
        disableClientRehydrated: true,
      } as IStorageOptions,
    },
  ],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    port: 'client',
    type: 'SharedWorker',
    workerURL: 'worker.bundle.js',
    forcedSyncClient: false,
    portName:
      globalThis.location.pathname === '/index.html' ? 'other' : 'default',
  },
}).then((app) => {
  app.bootstrap(document.getElementById('app'));
  window.app = app;
});
