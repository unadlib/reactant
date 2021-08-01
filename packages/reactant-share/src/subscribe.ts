import {
  Watch,
  watch as watchWithReactant,
  Subscribe,
  subscribe as subscribeWithReactant,
} from 'reactant';
import { getIsServer } from './serverChecker';

export const watch: Watch = (service, selector, watcher) => {
  return watchWithReactant(service, selector, (newValue, oldValue) => {
    if (getIsServer()) {
      watcher(newValue, oldValue);
    }
  });
};

export const subscribe: Subscribe = (service, listener) => {
  return subscribeWithReactant(service, () => {
    if (getIsServer()) {
      listener();
    }
  });
};
