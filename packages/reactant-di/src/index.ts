import 'reflect-metadata';
import {
  inject,
  injectable as injectify,
  Container,
  optional,
  interfaces,
} from 'inversify';

const injectableList: any[] = [];

export function injectable() {
  return function fn(target: any) {
    injectableList.push(target);
    injectify()(target);
    return target;
  };
}

export function createContainer(config?: interfaces.ContainerOptions) {
  const container = new Container(config);
  injectableList.forEach((item: any) => {
    container.bind(item).toSelf();
  });
  return container;
}

export type ContainerOptions = interfaces.ContainerOptions;

export { optional, inject };
