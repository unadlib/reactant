import {
  Container,
  MetadataReader,
  interfaces,
  ContainerModule,
  decorate,
} from 'inversify';
import {
  ContainerConfig,
  ModuleOptions,
  FactoryProvider,
  ValueProvider,
  ClassProvider,
  ServiceIdentifier,
  DependencyProviderOption,
} from './interfaces';
import { getMetadata } from './util';
import { createCollector } from './middlewares/collector';
import { METADATA_KEY } from './constants';
import { injectable } from './decorators';

class CustomMetadataReader extends MetadataReader {
  public getConstructorMetadata(
    constructorFunc: Function
  ): interfaces.ConstructorMetadata {
    const constructorMetadata = super.getConstructorMetadata(constructorFunc);
    // todo
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

function isClassProvider(module: ModuleOptions): module is ClassProvider {
  return typeof (module as ClassProvider).useClass === 'function';
}

function isFactoryProvider(module: ModuleOptions): module is FactoryProvider {
  return typeof (module as FactoryProvider).useFactory === 'function';
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
          (module as FactoryProvider).useFactory ||
          Object.hasOwnProperty.call(module, 'useValue')
        ) {
          const { name } = module.provide;
          throw new Error(
            `module '${name}' has been passed 'provide' for service, it should not pass 'useClass', 'useFactory' or 'useValue' property.`
          );
        } else if (isClassProvider(module)) {
          // auto decorate `@injectable` for module.useClass
          if (!providMeta.has(module.useClass))
            decorate(injectable({ provide: module.provide }), module.useClass);
          container.bind(module.provide).to(module.useClass);
        } else {
          // auto decorate `@injectable` for module.provide
          if (!providMeta.has(module.provide))
            decorate(injectable(), module.provide);
          container.bind(module.provide).toSelf();
        }
        // under -> token isn't function.
      } else if (isClassProvider(module)) {
        // auto decorate `@injectable` for module.useClass
        if (!providMeta.has(module.useClass))
          decorate(injectable(), module.useClass);
        container.bind(module.provide).to(module.useClass);
      } else if (Object.hasOwnProperty.call(module, 'useValue')) {
        container
          .bind(module.provide)
          .toConstantValue((module as ValueProvider).useValue);
      } else if (isFactoryProvider(module)) {
        container
          .bind(module.provide)
          .toFactory((context: interfaces.Context) => {
            const deps = module.deps || [];
            const depInstances = deps.map(token => {
              // TODO refactor with `is` assertion
              const provide =
                (token as DependencyProviderOption).provide ||
                (token as ServiceIdentifier<any>);
              if (
                (token as DependencyProviderOption).optional &&
                !context.container.isBound(
                  (token as DependencyProviderOption).provide
                )
              ) {
                return;
              }
              return context.container.get(provide);
            });
            return module.useFactory(...depInstances);
          });
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
