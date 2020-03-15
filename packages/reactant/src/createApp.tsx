import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import {
  createContainer,
  ContainerOptions,
  ServiceIdentifier,
  ViewModule,
  createStore,
  ServiceIdentifiersMap,
  ReactModuleOptions,
  Module,
  TypePreloadedState,
  ReactantStore,
  ReactantMiddleware,
  DevOptions,
} from 'reactant-module';

interface Config<T> {
  main: ServiceIdentifier<T>;
  render: (element: JSX.Element, ...args: any[]) => Element | void;
  modules?: ReactModuleOptions[];
  containerOptions?: ContainerOptions;
  middlewares?: ReactantMiddleware[];
  preloadedState?: TypePreloadedState<any>;
  devOptions?: DevOptions;
}

interface ReturnValue<T> {
  instance: T & ViewModule;
  store: ReactantStore | null;
  bootstrap(...args: any[]): void | Element;
}

function createApp<T>({
  main,
  render,
  modules = [],
  containerOptions,
  middlewares,
  preloadedState,
  devOptions,
}: Config<T>): ReturnValue<T> {
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
  const providers: FunctionComponent[] = [];
  const store = createStore(
    container,
    ServiceIdentifiers,
    preloadedState,
    middlewares,
    providers,
    devOptions
  );
  const withoutReducers = store.getState() === null;
  return {
    instance,
    store: withoutReducers ? null : store,
    bootstrap(...args: any[]): Element | void {
      const InstanceElement = <instance.component />;
      const RootElement = withoutReducers
        ? InstanceElement
        : providers
            .reverse()
            .reduce(
              (WrappedComponent, ProviderComponent) => (
                <ProviderComponent>{WrappedComponent}</ProviderComponent>
              ),
              InstanceElement
            );
      const element = withoutReducers ? (
        RootElement
      ) : (
        <Provider store={store}>{RootElement}</Provider>
      );
      return render(element, ...args);
    },
  };
}

export { createApp };
