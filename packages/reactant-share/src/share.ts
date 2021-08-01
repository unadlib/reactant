import { Callback } from './interfaces';

export const serverCallbacks = new Set<Callback>();

export const share = (callback: Callback) => {
  serverCallbacks.add(callback);
  return () => {
    serverCallbacks.delete(callback);
  };
};
