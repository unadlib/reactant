import {
  MetadataMap,
  Module,
  ServiceIdentifier,
  MetaDataKey,
} from './interfaces';

export const getMetadata = (metaKey: MetaDataKey): MetadataMap =>
  Reflect.getMetadata(metaKey, Reflect) || new Map();

export const setMetadata = (
  metaKey: MetaDataKey,
  target: Module<any>,
  serviceIdentifier: ServiceIdentifier<any> = target
) => {
  const providesMeta = getMetadata(metaKey);
  providesMeta.set(serviceIdentifier || target, target);
  Reflect.defineMetadata(metaKey, providesMeta, Reflect);
};
