import {
  MetadataMap,
  Module,
  ServiceIdentifier,
  MetaDataKey,
  ModuleOptions,
  ModuleProvider,
  ClassProvider,
} from './interfaces';
import { Optional } from './optional';

const getMetadata = (metaKey: MetaDataKey): MetadataMap =>
  Reflect.getMetadata(metaKey, Reflect) || new Map();

const setMetadata = (
  metaKey: MetaDataKey,
  target: Module<any>,
  serviceIdentifier: ServiceIdentifier<any> = target
) => {
  const providesMeta = getMetadata(metaKey);
  providesMeta.set(serviceIdentifier || target, target);
  Reflect.defineMetadata(metaKey, providesMeta, Reflect);
};

let modulesDeps: ModuleOptions[];

const getModulesDeps = () => modulesDeps;

const setModulesDeps = (deps: ModuleOptions[]) => {
  modulesDeps = deps;
};

const lookupServiceIdentifier = (
  target: object,
  original: ServiceIdentifier<any>,
  index?: number
) => {
  if (typeof index === 'undefined') return original;
  for (const modulesDep of modulesDeps) {
    if (typeof modulesDep === 'object') {
      const { deps } = modulesDep as ModuleProvider | ClassProvider;
      if (
        (modulesDep.provide === target ||
          (modulesDep as ClassProvider).useClass === target) &&
        Array.isArray(deps) &&
        typeof deps[index] !== 'undefined'
      ) {
        if (deps[index] instanceof Optional) {
          return (deps[index] as Optional).key;
        }
        return deps[index] as ServiceIdentifier<any>;
      }
    }
  }
  return original;
};

const lookupOptionalIdentifier = (
  serviceIdentifier: ServiceIdentifier<any>
) => {
  for (const modulesDep of modulesDeps) {
    const { deps } = modulesDep as ModuleProvider | ClassProvider;
    if (
      typeof modulesDep === 'object' &&
      Array.isArray(deps) &&
      ((modulesDep as ClassProvider).useClass ||
        Object.keys(modulesDep).length === 2)
    ) {
      return !!deps.filter(
        dep => dep instanceof Optional && dep.identifier === serviceIdentifier
      ).length;
    }
  }
  return false;
};

export {
  setMetadata,
  getMetadata,
  getModulesDeps,
  setModulesDeps,
  lookupServiceIdentifier,
  lookupOptionalIdentifier,
};
