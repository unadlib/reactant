import {
  injectable as injectify,
  inject as injectWithInversify,
  optional as optionalWithInversify,
  multiInject as multiInjectWithInversify,
  decorate,
} from 'inversify';
import { METADATA_KEY } from '../constants';
import { setMetadata } from '../util';
import { ModuleDecoratorOptions } from '../interfaces';

export function injectable(options: ModuleDecoratorOptions = {}) {
  // TODO fix `any` type
  return (target: any) => {
    const { deps = [], provide } = options;
    deps.forEach((option, index) => {
      if (typeof option === 'function') {
        decorate(injectWithInversify(option) as ClassDecorator, target, index);
      } else if (toString.call(option) === '[object Object]') {
        if (option.multi) {
          decorate(
            multiInjectWithInversify(option.provide) as ClassDecorator,
            target,
            index
          );
        } else {
          decorate(
            injectWithInversify(option.provide) as ClassDecorator,
            target,
            index
          );
        }
        if (option.optional) {
          setMetadata(METADATA_KEY.optional, target, option.provide);
          decorate(optionalWithInversify() as ClassDecorator, target, index);
        }
      }
    });
    // it has to use `Reflect.getMetadata` with metadata, it just get all injectable deps.
    // so add the services set for `injectable` services.
    setMetadata(METADATA_KEY.provide, target, provide);
    decorate(injectify(), target);
    return target;
  };
}
