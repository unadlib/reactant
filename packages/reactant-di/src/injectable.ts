import { injectable as injectify } from 'inversify';
import { getServices } from './util';

export function injectable() {
  return function fn(target: any) {
    getServices().unshift(target);
    injectify()(target);
    return target;
  };
}
