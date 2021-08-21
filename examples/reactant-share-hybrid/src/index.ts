import { render } from 'reactant-web';
import {
  createSharedApp,
  Router,
  Storage,
  StorageOptions,
  IStorageOptions,
} from 'reactant-share';
import localForage from 'localforage';
import { AppView } from './modules/app.view';

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
  render,
  share: {
    name: 'SharedApp',
    type: 'SharedTab',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
