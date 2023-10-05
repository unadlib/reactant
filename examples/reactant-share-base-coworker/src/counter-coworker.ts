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
  ICoworkerOptions,
  createCoworker,
} from 'reactant-share';
import localForage from 'localforage';
import { AppView } from './app.view';
import { ProxyCounter } from './proxyCounter';

const [CounterWorker, CounterWorkerOptions] = createCoworker('Counter');

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
      provide: 'NewProxyCounter',
      useClass: ProxyCounter,
    },
    CounterWorker,
    {
      provide: CounterWorkerOptions,
      useValue: {
        useModules: ['NewProxyCounter'],
        isCoworker: true,
      } as ICoworkerOptions,
    },
  ],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: 'SharedWorkerApp',
    type: 'Base',
  },
}).then((app) => {
  console.log(app, '====');
  self.app = app;
});
