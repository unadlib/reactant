import { Unsubscribe } from 'redux';
import { Subscribe, Watch } from '../interfaces';
import { storeKey, subscriptionsKey } from '../constants';
import { isEqual } from '../utils';

export const subscribe: Subscribe = (service, listener) => {
  if (typeof listener !== 'function') {
    throw new Error(`The listener should be a function.`);
  }
  let unsubscribe: Unsubscribe;
  if (service[storeKey]) {
    unsubscribe = service[storeKey]?.subscribe(listener)!;
  } else {
    // When constructing
    const subscriptions = service[subscriptionsKey] || [];
    let _unsubscribe: Unsubscribe;
    subscriptions.push(() => {
      _unsubscribe = service[storeKey]?.subscribe(listener)!;
    });
    unsubscribe = () => _unsubscribe();
    Object.assign(service, {
      [subscriptionsKey]: subscriptions,
    });
  }
  return unsubscribe!;
};

export const watch: Watch = (service, selector, watcher) => {
  let oldValue = selector();
  return subscribe(service, () => {
    const newValue = selector();
    if (!isEqual(newValue, oldValue)) {
      watcher(newValue, oldValue);
      oldValue = newValue;
    }
  });
};
