/* eslint-disable no-new */
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

const a = () => {
  new SharedWorker(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new URL(/* webpackChunkName: "worker" */ './worker.ts', import.meta.url)
  );
};

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
    port: 'client',
    type: 'SharedWorker',
    worker: global.__worker__,
    forcedSyncClient: false,
    portName:
      globalThis.location.pathname === '/index.html' ? 'other' : 'default',
  },
}).then((app: any) => {
  app.bootstrap(document.getElementById('app'));
  window.app = app;
});
