import { Unsubscribe } from 'redux';
import { Service } from '../interfaces';
import { storeKey } from '../constants';

type Subscribe = (service: Service, listener: () => void) => Unsubscribe;

export const subscribe: Subscribe = (service, listener) => {
  if (typeof listener !== 'function') {
    throw new Error(`The listener should be a function.`);
  }
  const unsubscribe = service[storeKey]?.subscribe(listener);
  return unsubscribe!;
};
