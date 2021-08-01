/* eslint-disable consistent-return */
import { serverCallbacks } from './share';

let isMain: boolean | undefined;

export const getIsMain = () => isMain;

export const setIsMain = (state: boolean) => {
  isMain = state;
  return () => {
    if (!getIsMain()) return;
    for (const callback of serverCallbacks) {
      try {
        callback();
      } catch (e) {
        //
      }
    }
  };
};
