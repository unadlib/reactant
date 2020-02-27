import { Container } from 'inversify';
import { autoProvide, buildProviderModule } from 'inversify-binding-decorators';
import { ContainerConfig } from './interfaces';
import { getServices } from './util';
import { createCollector } from './middlewares/collector';

export function createContainer({
  ServiceIdentifiers,
  modules = [],
  options,
}: ContainerConfig) {
  const container = new Container(options);
  const autoInjectModules = [];
  for (const module of modules) {
    if (typeof module === 'function') {
      if (getServices().indexOf(module) === -1) autoInjectModules.push(module);
    } else if (typeof module === 'object') {
      if (typeof module.provide === 'function') {
        if (module.useClass || Object.hasOwnProperty.call(module, 'useValue')) {
          const { name } = module as any;
          throw new Error(
            `module '${name}' has been passed 'provide' for service, it should not pass 'useClass' or 'useValue' property.`
          );
        }
        if (getServices().indexOf(module.provide) === -1)
          autoInjectModules.push(module.provide);
      } else if (typeof module.useClass === 'function') {
        if (getServices().indexOf(module.useClass) === -1)
          autoInjectModules.push(module.useClass);
      }
      if (module.useClass) {
        container.bind(module.provide).to(module.useValue);
      } else if (Object.hasOwnProperty.call(module, 'useValue')) {
        container.bind(module.provide).toConstantValue(module.useValue);
      }
    }
  }
  const autoInjectModulesObject = autoInjectModules.reduce(
    (modulesObject, module, index) =>
      Object.assign(modulesObject, { [index]: module }),
    {}
  );
  autoProvide(container, autoInjectModulesObject);
  container.load(buildProviderModule());
  container.applyMiddleware(createCollector(ServiceIdentifiers));
  getServices().forEach((item: any) => {
    container.bind(item).toSelf();
  });
  return container;
}
