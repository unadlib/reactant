import { optional as optionalWithInversify, decorate } from 'inversify';
import { inject } from './inject';
import { ServiceIdentifier } from '../interfaces';
import { METADATA_KEY } from '../constants';
import { setMetadata } from '../util';

export function optional(token?: ServiceIdentifier<any>) {
  return (target: any, targetKey: string, index?: number) => {
    inject(token)(target, targetKey, index);
    optionalWithInversify()(target, targetKey, index);

    // const optionalMetadata: Map<any, boolean> =
    //   Reflect.getMetadata(METADATA_KEY.optional, Reflect) || new Map();
    // if (!optionalMetadata.get(target)) {

    //   optionalMetadata.set(target, true);
    //   Reflect.defineMetadata(METADATA_KEY.provide, optionalMetadata, Reflect);
    // }
    const paramtypes = Reflect.getMetadata(METADATA_KEY.paramtypes, target);
    setMetadata(METADATA_KEY.optional, paramtypes[index!], token);
    // decorate(inject(token) as ClassDecorator, target, index);
    // decorate(optionalWithInversify() as ClassDecorator, target, index);
  };
}
