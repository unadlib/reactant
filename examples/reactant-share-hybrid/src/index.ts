import { render } from 'reactant-web';
import {
  createSharedApp,
  Router,
  RouterOptions,
  Storage,
  StorageOptions,
  IStorageOptions,
  IRouterOptions,
  createHashHistory,
} from 'reactant-share';
import localForage from 'localforage';
import { AppView } from './modules/app.view';

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
    name: 'SharedApp',
    type: 'SharedTab',
    portName:
      globalThis.location.pathname === '/index.html' ? 'other' : 'default',
    forcedShare: true,
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
