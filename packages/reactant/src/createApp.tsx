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
  PartialRequired,
} from 'reactant-module';

export interface Config<T> {
  main: ServiceIdentifier<T>;
  render?: (element: JSX.Element, ...args: any[]) => Element | void;
  modules?: ReactModuleOptions[];
  containerOptions?: ContainerOptions;
  middlewares?: ReactantMiddleware[];
  preloadedState?: TypePreloadedState<any>;
  devOptions?: DevOptions;
}

export interface ReturnValue<T> {
  instance: T;
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
}: PartialRequired<Config<T>, 'render'>): ReturnValue<T> {
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
  const providers: FunctionComponent[] = [];
  const store = createStore(
    modules,
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
      if (!(instance instanceof ViewModule)) {
        throw new Error(`Main module should be a 'ViewModule'.`);
      }
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
