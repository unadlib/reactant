/* eslint-disable consistent-return */
import { serverCallbacks } from './share';

let isServer: boolean | undefined;

export const getIsServer = () => isServer;

export const setIsServer = (state: boolean) => {
  isServer = state;
  return () => {
    if (!getIsServer()) return;
    for (const callback of serverCallbacks) {
      try {
        callback();
      } catch (e) {
        //
      }
    }
  };
};
