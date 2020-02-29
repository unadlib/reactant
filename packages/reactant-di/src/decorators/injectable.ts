import { injectable as injectify, decorate } from 'inversify';
import { METADATA_KEY } from '../constants';
import { ServiceIdentifier } from '../interfaces';
import { setMetadata } from '../util';

// TODO support serice config?
export function injectable(token?: ServiceIdentifier<any>) {
  return (target: any) => {
    // it has to use `Reflect.getMetadata` with metadata, it just get all injectable deps.
    // so add the services set for `injectable` services.
    setMetadata(METADATA_KEY.provide, target, token);
    decorate(injectify(), target);
    return target;
  };
}
