import { Container } from 'inversify';
import { ContainerOptions } from './interfaces';
import { getServices, setServiceIdentifiers } from './util';
import { collector } from './middlewares/collector';

export function createContainer(config?: ContainerOptions) {
  setServiceIdentifiers([]);
  const container = new Container(config);
  container.applyMiddleware(collector);
  getServices().forEach((item: any) => {
    container.bind(item).toSelf();
  });
  return container;
}
