import {
  Container,
  MetadataReader,
  interfaces,
  ContainerModule,
  decorate,
} from 'inversify';
import { ContainerConfig } from './interfaces';
import { getMetadata } from './util';
import { createCollector } from './middlewares/collector';
import { METADATA_KEY } from './constants';
import { injectable } from './decorators';

class CustomMetadataReader extends MetadataReader {
  public getConstructorMetadata(
    constructorFunc: Function
  ): interfaces.ConstructorMetadata {
    const constructorMetadata = super.getConstructorMetadata(constructorFunc);
    // console.log(constructorMetadata);
    return constructorMetadata;
  }
}

function autoBindModules() {
  return new ContainerModule(
    (
      bind: interfaces.Bind,
      unbind: interfaces.Unbind,
      isBound: interfaces.IsBound
    ) => {
      const providMeta = getMetadata(METADATA_KEY.provide);
      const optionalMeta = getMetadata(METADATA_KEY.optional);
      for (const [token, provide] of providMeta) {
        // default injection without optional module.
        if (!optionalMeta.has(token) && !isBound(token)) {
          bind(token).to(provide);
        }
      }
    }
  );
}

export function createContainer({
  ServiceIdentifiers,
  modules = [],
  options,
}: ContainerConfig) {
  const providMeta = getMetadata(METADATA_KEY.provide);
  const container = new Container(options);
  container.applyCustomMetadataReader(new CustomMetadataReader());
  for (const module of modules) {
    if (typeof module === 'function') {
      // auto decorate `@injectable` for module.
      if (!providMeta.has(module)) decorate(injectable(), module);
      container.bind(module).toSelf();
    } else if (typeof module === 'object') {
      if (typeof module.provide === 'function') {
        if (
          module.useFactory ||
          Object.hasOwnProperty.call(module, 'useValue')
        ) {
          const { name } = module as any;
          throw new Error(
            `module '${name}' has been passed 'provide' for service, it should not pass 'useClass', 'useFactory' or 'useValue' property.`
          );
        } else if (typeof module.useClass === 'function') {
          // auto decorate `@injectable` for module.useClass
          if (!providMeta.has(module.useClass))
            decorate(injectable(module.provide), module.useClass);
          container.bind(module.provide).to(module.useClass);
        } else {
          // auto decorate `@injectable` for module.provide
          if (!providMeta.has(module.provide))
            decorate(injectable(), module.provide);
          container.bind(module.provide).toSelf();
        }
        // under: token isn't function.
      } else if (typeof module.useClass === 'function') {
        // auto decorate `@injectable` for module.useClass
        if (!providMeta.has(module.useClass))
          decorate(injectable(), module.useClass);
        container.bind(module.provide).to(module.useClass);
      } else if (Object.hasOwnProperty.call(module, 'useValue')) {
        container.bind(module.provide).toConstantValue(module.useValue);
      } else if (typeof module.useFactory === 'function') {
        container.bind(module.provide).toFactory(module.useFactory);
        if (Array.isArray(module.deps)) {
          // todo deps for `useFactory`
        }
      } else {
        throw new Error(`${module} option error`);
      }
    } else {
      throw new Error(`${module} option error`);
    }
  }
  // load modules with `@injectable` decoration, but without `@optional` decoration.
  container.load(autoBindModules());
  container.applyMiddleware(createCollector(ServiceIdentifiers));
  return container;
}
