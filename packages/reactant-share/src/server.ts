/* eslint-disable consistent-return */
import { App } from 'reactant';
import { serverCallbacks } from './share';

let server: App<any> | undefined;

export const getServer = () => server;

export const setServer = (app: App<any> | undefined) => {
  server = app;
  if (!app) return;
  for (const [_, callbacks] of serverCallbacks) {
    for (const callback of callbacks) {
      try {
        callback();
      } catch (e) {
        //
      }
    }
  }
};
