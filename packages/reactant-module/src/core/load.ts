import { Load } from '../interfaces';
import { loaderKey } from '../constants';
import { subscribe } from './subscribe';

const load: Load = (service, options) => {
  return new Promise((resolve) => {
    if (!service[loaderKey]) {
      const unsubscribe = subscribe(service, () => {
        if (service[loaderKey]) {
          unsubscribe();
          service[loaderKey](options, resolve);
        }
      });
      return;
    }
    service[loaderKey](options, resolve);
  });
};

export { load };
