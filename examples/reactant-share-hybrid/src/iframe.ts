import { render } from 'reactant-web';
import {
  createSharedApp,
  RouterOptions,
  createHashHistory,
  IRouterOptions,
} from 'reactant-share';
import { CounterView } from './modules/counter.view';

createSharedApp({
  modules: [
    {
      provide: RouterOptions,
      useValue: {
        createHistory: () => createHashHistory(),
      } as IRouterOptions,
    },
  ],
  main: CounterView,
  render,
  share: {
    name: 'SharedApp',
    type: 'SharedTab',
    port: 'client',
    portName:
      globalThis.location.pathname === '/index.html' ? 'other' : 'default',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
