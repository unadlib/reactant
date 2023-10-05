/* eslint-disable no-restricted-globals */
import {
  createSharedApp,
  Router,
  Storage,
  StorageOptions,
  IStorageOptions,
  RouterOptions,
  createHashHistory,
  IRouterOptions,
  Coworker,
  CoworkerOptions,
  ICoworkerOptions,
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
    Coworker,
    {
      provide: CoworkerOptions,
      useValue: {
        enablePatchesChecker: true,
        isCoworker: true,
        useModules: [ProxyCounter],
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
    type: 'SharedWorker',
  },
}).then((app) => {
  console.log(app, '====');
  self.app = app;
});
