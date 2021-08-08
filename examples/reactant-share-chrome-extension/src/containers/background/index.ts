/* eslint-disable no-restricted-globals */
import { createApp } from 'reactant-share';
import { AppView, Counter } from '../app';

createApp({
  modules: [{ provide: 'counter', useClass: Counter }],
  main: { provide: 'appView', useClass: AppView },
  render: () => {
    //
  },
  share: {
    name: 'counter',
    port: 'server',
    type: 'BrowserExtension',
  },
}).then((app) => {
  console.log(app, '====');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (window as any).app = app;
});
