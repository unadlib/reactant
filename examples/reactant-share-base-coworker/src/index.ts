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
  createCoworker,
} from 'reactant-share';
import type { IStorageOptions, IRouterOptions, ICoworkerOptions } from 'reactant-share';
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
    Coworker,
    {
      provide: CoworkerOptions,
      useValue: {
        useModules: [ProxyCounter],
        // @ts-ignore
        worker: new Worker(new URL('./coworker.ts', import.meta.url)),
        isCoworker: false,
      } as ICoworkerOptions,
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
        // @ts-ignore
        worker: new Worker(new URL('./counter-coworker.ts', import.meta.url)),
        isCoworker: false,
      } as ICoworkerOptions,
    },
  ],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    type: 'Base',
  },
}).then((app) => {
  app.bootstrap(document.getElementById('app'));
  window.app = app;
});
