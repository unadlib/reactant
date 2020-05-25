import {
  Container,
  ContainerModule,
  decorate,
  interfaces,
  MetadataReader,
} from 'inversify';

import { METADATA_KEY } from './constants';
import { inject, injectable } from './decorators';
import {
  ClassProvider,
  ContainerConfig,
  DependencyProviderOption,
  FactoryProvider,
  ModuleOptions,
  ModuleProvider,
  ServiceIdentifier,
  ValueProvider,
} from './interfaces';
import { createCollector } from './middlewares/collector';
import { ModuleRef } from './moduleRef';
import { defaultUndefinedValue, Optional } from './optional';
import { getMetadata } from './util';

let modulesDeps: ModuleOptions[];

export function lookupServiceIdentifier(
  target: object,
  original: ServiceIdentifier<any>,
  index?: number
) {
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
}

export function lookupOptionalIdentifier(
  serviceIdentifier: ServiceIdentifier<any>
) {
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
}

class CustomMetadataReader extends MetadataReader {
  public getConstructorMetadata(
    constructorFunc: Function
  ): interfaces.ConstructorMetadata {
    const constructorMetadata = super.getConstructorMetadata(constructorFunc);
    // TODO: hook
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
      const provideMeta = getMetadata(METADATA_KEY.provide);
      const optionalMeta = getMetadata(METADATA_KEY.optional);
      for (const [identifier, provide] of provideMeta) {
        // default injection without optional module.
        if (
          (!optionalMeta.has(identifier) ||
            lookupOptionalIdentifier(identifier)) &&
          !isBound(identifier)
        ) {
          bind(identifier).to(provide);
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

/**
 * It ensures that the parameters of all modules from the configuration are decorated.
 *
 * class Foo {
 *   constructor(bar: Bar) {}
 * }
 *
 * Equate to:
 *
 * class Foo {
 *   constructor(@inject() bar: Bar) {}
 * }
 *
 * @param target {object} decorated target.
 */
function autoDecorateParams(target: object) {
  const metadata: object[] = Reflect.getMetadata(
    METADATA_KEY.inversifyParamtypes,
    target
  );

  metadata.forEach((_, index) => {
    if (
      !Reflect.getMetadata(METADATA_KEY.inversifyTagged, target) ||
      !Reflect.getMetadata(METADATA_KEY.inversifyTagged, target)[index]
    ) {
      inject()(target, undefined, index);
    }
  });
}

export function createContainer({
  ServiceIdentifiers,
  modules = [],
  options,
}: ContainerConfig) {
  modulesDeps = modules;
  const provideMeta = getMetadata(METADATA_KEY.provide);
  const container = new Container(options);
  container.applyCustomMetadataReader(new CustomMetadataReader());
  for (const module of modules) {
    if (typeof module === 'function') {
      // auto decorate `@injectable` for module.
      if (!provideMeta.has(module)) decorate(injectable(), module);
      autoDecorateParams(module);
      container.bind(module).toSelf();
    } else if (typeof module === 'object') {
      if (isClassProvider(module)) {
        // auto decorate `@injectable` for module.useClass
        if (!provideMeta.has(module.useClass))
          decorate(injectable(), module.useClass);
        autoDecorateParams(module.useClass);
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
            const depInstances = deps.map(identifier => {
              // TODO: refactor with `is` assertion
              const provide =
                (identifier as DependencyProviderOption).provide ||
                (identifier as ServiceIdentifier<any>);
              if (
                (identifier as DependencyProviderOption).optional &&
                !context.container.isBound(
                  (identifier as DependencyProviderOption).provide
                )
              ) {
                return undefined;
              }
              return context.container.get(provide);
            });
            return module.useFactory(...depInstances);
          });
      } else if (typeof module.provide === 'function') {
        // auto decorate `@injectable` for module.provide
        if (!provideMeta.has(module.provide))
          decorate(injectable(), module.provide);
        autoDecorateParams(module.provide);
        container.bind(module.provide).toSelf();
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
  if (container.isBound(ModuleRef)) {
    container.unbind(ModuleRef);
  }
  container.bind(ModuleRef).toConstantValue(container);
  container.bind(defaultUndefinedValue).toConstantValue(undefined);
  return container;
}
