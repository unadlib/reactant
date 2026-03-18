import { render } from 'reactant-web';
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
        // @ts-ignore
        worker: new SharedWorker(new URL('./coworker.ts', import.meta.url)),
      } as ICoworkerOptions,
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
