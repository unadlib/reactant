import { ThisService } from 'reactant';
import { Callback } from './interfaces';

export const serverCallbacks = new Map<ThisService, Set<Callback>>();

/**
 * Multiple renders share a common execution process.
 */
export const serve = (service: ThisService, callback: Callback) => {
  try {
    callback();
  } catch (e) {
    //
  }
  const callbacks = serverCallbacks.get(service) ?? new Set<Callback>();
  callbacks.add(callback);
  return () => {
    callbacks.delete(callback);
  };
};
