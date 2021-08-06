/* eslint-disable no-restricted-globals */
import { createApp } from 'reactant-share';
import { AppView, Counter } from './app';

createApp({
  modules: [{ provide: 'counter', useClass: Counter }],
  name: 'counter',
  main: { provide: 'appView', useClass: AppView },
  port: 'server',
  render: () => {
    //
  },
  type: 'ShareWorker',
}).then((app) => {
  console.log(app, '====');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (self as any).app = app;
});
