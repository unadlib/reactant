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
import { ProxyCounter } from './proxyCounter';

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
      } as IStorageOptions,
    },
  ],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    type: 'Base',
    coworker: {
      isCoworker: false,
      modules: [ProxyCounter],
      workerURL: 'coworker.bundle.js',
    },
  },
}).then((app) => {
  app.bootstrap(document.getElementById('app'));
  window.app = app;
});
