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
  CoworkerExecutorOptions,
  ICoworkerExecutorOptions,
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
    {
      provide: CoworkerExecutorOptions,
      useValue: {
        enablePatchesChecker: true,
        ignoreSyncMethods: ['increase1'],
        ignoreSyncStateKeys: ['count1'],
      } as ICoworkerExecutorOptions,
    },
  ],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: 'SharedWorkerApp',
    type: 'SharedWorker',
    coworker: {
      isCoworker: true,
      modules: [ProxyCounter],
      workerURL: 'coworker.bundle.js',
    },
  },
}).then((app) => {
  console.log(app, '====');
  self.app = app;
});
