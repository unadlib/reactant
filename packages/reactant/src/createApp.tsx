import React from 'react';
import { Provider } from 'react-redux';
import {
  createContainer,
  ContainerOptions,
  ServiceIdentifier,
  View,
  createStore,
  ServiceIdentifiersMap,
} from 'reactant-module';

interface Module<T> extends Function {
  new (...args: any[]): T;
}

interface Config<T> {
  modules: Module<any>[];
  main: ServiceIdentifier<T>;
  render: (element: JSX.Element, ...args: any[]) => Element | void;
  containerOptions?: ContainerOptions;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps {
  // version: string;
}

// eslint-disable-next-line no-shadow
function createApp<T>({ modules, main, render, containerOptions }: Config<T>) {
  const ServiceIdentifiers: ServiceIdentifiersMap = new Map();
  const container = createContainer(ServiceIdentifiers, {
    defaultScope: 'Singleton',
    ...containerOptions,
  });
  const instance = container.get<T>(main);
  const store = createStore(container, ServiceIdentifiers);
  console.log(ServiceIdentifiers.get(main));
  if (__DEV__) {
    // todo check service naming conflicts
  }
  return {
    instance,
    store,
    bootstrap(...args: any[]): Element | void {
      if (typeof instance === 'undefined') {
        throw new Error('`main` module has not a valid instance.');
      }
      const Component = ((instance as any) as View).component;
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
