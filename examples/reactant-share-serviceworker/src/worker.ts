/* eslint-disable no-restricted-globals */
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
  render: () => {
    //
  },
  share: {
    name: 'ServiceWorkerApp',
    port: 'server',
    type: 'ServiceWorker',
  },
}).then((app) => {
  console.log(app, '====');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (self as any).app = app;
});
