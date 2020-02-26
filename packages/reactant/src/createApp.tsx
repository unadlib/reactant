import React from 'react';
import { Provider } from 'react-redux';
import {
  createContainer,
  ContainerOptions,
  ServiceIdentifier,
  ViewModule,
  createStore,
  ServiceIdentifiersMap,
  ModuleOptions,
} from 'reactant-module';

interface Config<T> {
  modules?: ModuleOptions[];
  main: ServiceIdentifier<T>;
  render: (element: JSX.Element, ...args: any[]) => Element | void;
  containerOptions?: ContainerOptions;
}

function createApp<T>({
  modules = [],
  main,
  render,
  containerOptions,
}: Config<T>) {
  const ServiceIdentifiers: ServiceIdentifiersMap = new Map();
  const container = createContainer(ServiceIdentifiers, {
    defaultScope: 'Singleton',
    ...containerOptions,
    skipBaseClassChecks: true,
  });
  const instance = container.get<T>(main);
  if (!(instance instanceof ViewModule)) {
    throw new Error(`Main module should be a 'ViewModule'.`);
  }
  const store = createStore(container, ServiceIdentifiers, modules);
  return {
    instance,
    store,
    bootstrap(...args: any[]): Element | void {
      const Component = instance.component;
      const element = (
        <Provider store={store}>
          <Component />
        </Provider>
      );
      return render(element, ...args);
    },
  };
}

export { createApp };
