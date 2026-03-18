/* eslint-disable no-restricted-globals */
import {
  createSharedApp,
  Router,
  Storage,
  StorageOptions,
  RouterOptions,
  createHashHistory,
  Coworker,
  CoworkerOptions,
} from 'reactant-share';
import type { IStorageOptions, IRouterOptions, ICoworkerOptions } from 'reactant-share';
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
    Coworker,
    {
      provide: CoworkerOptions,
      useValue: {
        isCoworker: false,
        useModules: [ProxyCounter],
        enablePatchesChecker: true,
        ignoreSyncStateKeys: ['count1'],
      } as ICoworkerOptions,
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
