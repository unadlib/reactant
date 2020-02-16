import { Container } from 'inversify';
import { ContainerOptions } from './interfaces';
import { getServices } from './util';

export function createContainer(config?: ContainerOptions) {
  const container = new Container(config);
  getServices().forEach((item: any) => {
    container.bind(item).toSelf();
  });
  return container;
}
