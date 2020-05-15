import { Watch } from '../interfaces';
import { isEqual } from '../utils';
import { subscribe } from './subscribe';

const watch: Watch = (service, selector, watcher) => {
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
