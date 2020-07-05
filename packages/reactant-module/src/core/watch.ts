import { Watch } from '../interfaces';
import { subscribe } from './subscribe';
import { isEqual } from '../utils';

const watch: Watch = (service, selector, watcher) => {
  if (typeof watcher !== 'function') {
    throw new Error(`The 'watcher' should be a function.`);
  }
  let oldValue = selector();
  return subscribe(service, () => {
    const newValue = selector();
    if (!isEqual(newValue, oldValue)) {
      watcher(newValue, oldValue);
      oldValue = newValue;
    }
  });
};

export { watch };
