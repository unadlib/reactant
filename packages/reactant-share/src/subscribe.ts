import {
  Watch,
  watch as watchWithReactant,
  Subscribe,
  subscribe as subscribeWithReactant,
} from 'reactant';
import { getIsMain } from './tabChecker';

export const watch: Watch = (service, selector, watcher) => {
  return watchWithReactant(service, selector, (newValue, oldValue) => {
    if (getIsMain()) {
      watcher(newValue, oldValue);
    }
  });
};

export const subscribe: Subscribe = (service, listener) => {
  return subscribeWithReactant(service, () => {
    if (getIsMain()) {
      listener();
    }
  });
};
