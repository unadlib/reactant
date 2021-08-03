/* eslint-disable consistent-return */
import { serverCallbacks } from './share';

let isServer: boolean | undefined;

export const getIsServer = () => isServer;

export const setIsServer = (state: boolean) => {
  isServer = state;
  return () => {
    if (!getIsServer()) return;
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
};
