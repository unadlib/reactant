import { Container } from 'inversify';
import { ContainerOptions, ServiceIdentifiersMap } from './interfaces';
import { getServices } from './util';
import { createCollector } from './middlewares/collector';

export function createContainer(
  ServiceIdentifiers: ServiceIdentifiersMap,
  config?: ContainerOptions
) {
  const container = new Container(config);
  container.applyMiddleware(createCollector(ServiceIdentifiers));
  getServices().forEach((item: any) => {
    container.bind(item).toSelf();
  });
  return container;
}
