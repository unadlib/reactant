import { decorate, injectable as injectify } from 'inversify';

import { METADATA_KEY } from '../constants';
import { ModuleDecoratorOptions } from '../interfaces';
import { setMetadata } from '../util';
import { inject } from './inject';
import { multiInject } from './multiInject';
import { multiOptional } from './multiOptional';
import { optional } from './optional';

export function injectable(options: ModuleDecoratorOptions = {}) {
  return (target: any) => {
    const { deps = [] } = options;
    deps.forEach((option, index) => {
      if (typeof option === 'function') {
        decorate(inject(option) as ClassDecorator, target, index);
      } else if (toString.call(option) === '[object Object]') {
        if (option.optional && !option.multi) {
          decorate(optional(option.provide) as ClassDecorator, target, index);
        } else if (option.multi && !option.optional) {
          decorate(
            multiInject(option.provide) as ClassDecorator,
            target,
            index
          );
        } else if (option.multi && option.optional) {
          decorate(
            multiOptional(option.provide) as ClassDecorator,
            target,
            index
          );
        } else if (option.provide) {
          decorate(inject(option.provide) as ClassDecorator, target, index);
        } else {
          throw new Error(`@injectable ${option} option error`);
        }
      } else {
        throw new Error(`@injectable ${option} option error`);
      }
    });
    // it has to use `Reflect.getMetadata` with metadata, it just get all injectable deps.
    // so add the services set for `injectable` services.
    setMetadata(METADATA_KEY.provide, target, target);
    decorate(injectify(), target);
    return target;
  };
}
