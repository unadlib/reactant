import { optional as optionalWithInversify, decorate } from 'inversify';
import { multiInject } from './multiInject';
import { ServiceIdentifier } from '../interfaces';
import { METADATA_KEY } from '../constants';
import { setMetadata } from '../util';

export function multiOptional(token: ServiceIdentifier<any>) {
  return (target: object, targetKey: string, index?: number) => {
    const paramtypes = Reflect.getMetadata(METADATA_KEY.paramtypes, target);
    setMetadata(METADATA_KEY.optional, paramtypes[index!], token);
    decorate(multiInject(token) as ClassDecorator, target, index);
    decorate(optionalWithInversify() as ClassDecorator, target, index);
  };
}
