import { optional as optionalWithInversify, decorate } from 'inversify';
import { inject } from './inject';
import { ServiceIdentifier } from '../interfaces';
import { METADATA_KEY } from '../constants';
import { setMetadata } from '../util';

export function optional(serviceIdentifier?: ServiceIdentifier<any>) {
  return (target: object, targetKey?: string, index?: number) => {
    const paramtypes = Reflect.getMetadata(METADATA_KEY.paramtypes, target);
    setMetadata(METADATA_KEY.optional, paramtypes[index!], serviceIdentifier);
    decorate(inject(serviceIdentifier) as ClassDecorator, target, index);
    decorate(optionalWithInversify() as ClassDecorator, target, index);
  };
}
