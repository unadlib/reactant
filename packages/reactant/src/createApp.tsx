import React from 'react';
import { Provider } from 'react-redux';
import {
  createContainer,
  ContainerOptions,
  ServiceIdentifier,
  View,
  createStore,
  ServiceIdentifiersMap,
  ModuleOptions,
  setSelectorsCache,
} from 'reactant-module';
import { injectConnector } from './injectConnector';

interface Config<T> {
  modules?: ModuleOptions[];
  main: ServiceIdentifier<T>;
  render: (element: JSX.Element, ...args: any[]) => Element | void;
  containerOptions?: ContainerOptions;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps {
  // version: string;
}

// eslint-disable-next-line no-shadow
function createApp<T>({
  modules = [],
  main,
  render,
  containerOptions,
}: Config<T>) {
  setSelectorsCache(new Map());
  const ServiceIdentifiers: ServiceIdentifiersMap = new Map();
  const container = createContainer(ServiceIdentifiers, {
    defaultScope: 'Singleton',
    ...containerOptions,
    skipBaseClassChecks: true,
  });
  const instance = container.get<T>(main);
  if (!(instance instanceof View)) {
    throw new Error(`Main module should be a 'View' module.`);
  }
  const store = createStore(
    container,
    ServiceIdentifiers,
    injectConnector,
    modules
  );
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
