import { Container, interfaces } from 'inversify';
import { getServices } from './util';

export function createContainer(config?: interfaces.ContainerOptions) {
  const container = new Container(config);
  getServices().forEach((item: any) => {
    container.bind(item).toSelf();
  });
  return container;
}
