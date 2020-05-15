import { Unsubscribe } from 'redux';

import { storeKey, subscriptionsKey } from '../constants';
import { Subscribe } from '../interfaces';

const subscribe: Subscribe = (service, listener) => {
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

export { subscribe };
