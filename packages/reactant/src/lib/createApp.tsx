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
  Module,
  PreloadedState,
} from 'reactant-module';

interface Config<T> {
  main: ServiceIdentifier<T>;
  render: (element: JSX.Element, ...args: any[]) => Element | void;
  modules?: ModuleOptions[];
  containerOptions?: ContainerOptions;
  preloadedState?: PreloadedState<any>;
}

function createApp<T>({
  main,
  render,
  modules = [],
  containerOptions,
  preloadedState,
}: Config<T>) {
  const ServiceIdentifiers: ServiceIdentifiersMap = new Map();
  const container = createContainer({
    ServiceIdentifiers,
    modules: [main as Module<any>, ...modules],
    options: {
      defaultScope: 'Singleton',
      ...containerOptions,
      skipBaseClassChecks: true,
    },
  });
  const instance = container.get<T>(main);
  if (!(instance instanceof ViewModule)) {
    throw new Error(`Main module should be a 'ViewModule'.`);
  }
  const store = createStore(
    container,
    ServiceIdentifiers,
    modules,
    preloadedState
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
