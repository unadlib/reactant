/* eslint-disable no-restricted-globals */
import {
  createSharedApp,
  Router,
  Storage,
  StorageOptions,
  RouterOptions,
  createHashHistory,
} from 'reactant-share';
import type { IStorageOptions, IRouterOptions } from 'reactant-share';
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
      } as IStorageOptions,
    },
  ],
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
  self.app = app;
});
