import {
  Watch,
  watch as watchWithReactant,
  Subscribe,
  subscribe as subscribeWithReactant,
} from 'reactant';
import { getServer } from './server';

export const watch: Watch = (service, selector, watcher) => {
  return watchWithReactant(service, selector, (newValue, oldValue) => {
    if (getServer()) {
      watcher(newValue, oldValue);
    }
  });
};

export const subscribe: Subscribe = (service, listener) => {
  return subscribeWithReactant(service, () => {
    if (getServer()) {
      listener();
    }
  });
};
