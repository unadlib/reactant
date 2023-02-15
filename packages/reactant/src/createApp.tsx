/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { FunctionComponent, StrictMode, Context } from 'react';
import { Provider } from 'react-redux';
import {
  createContainer,
  ViewModule,
  createStore,
  ServiceIdentifiersMap,
  bindModules,
  Loader,
  PluginHooks,
  ModulesMap,
  Container,
  modulesKey,
  Service,
  unsubscriptionsKey,
  getMetadata,
  METADATA_KEY,
  DynamicModules,
} from 'reactant-module';
import { Config, App, Renderer } from './interfaces';

export const ContainerContext: Context<Container | null> =
  React.createContext<Container | null>(null);

/**
 * ## Description
 *
 * You can create an app with `createApp()` passing app configuration,
 * which will return an object including `instance`, `store`,
 * and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).
 *
 * ## Example
 *
 * ```typescript
 * import { createApp, injectable } from 'reactant';
 *
 * @injectable()
 * class Foo {}
 *
 * const app = createApp({
 *   modules: [],
 *   main: Foo,
 *   render: () => {},
 * });
 *
 * expect(app.instance instanceof Foo).toBeTruthy();
 * ```
 */
function createApp<T, S extends any[], R extends Renderer<S>>({
  /**
   * As the main start-up module.
   */
  main,
  /**
   * As a rendering function for any React renderer.
   */
  render,
  /**
   * Importing the injected dependency modules.
   */
  modules: _modules = [],
  /**
   * Dependent injection container options.
   */
  containerOptions,
  /**
   * Preloaded state of shared state for Redux.
   */
  preloadedState,
  /**
   * Reactant's development setting options.
   */
  devOptions,
}: Config<T, S, R>): App<T, S, R> {
  const modules = [..._modules, main];
  const ServiceIdentifiers: ServiceIdentifiersMap = new Map();
  const dynamicModules: DynamicModules = new Map();
  const modulesMap: ModulesMap = {};
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
      ...containerOptions,
      skipBaseClassChecks: true,
    },
  });
  const pluginHooks: PluginHooks = {
    middleware: [],
    beforeCombineRootReducers: [],
    afterCombineRootReducers: [],
    enhancer: [],
    preloadedStateHandler: [],
    afterCreateStore: [],
    provider: [] as FunctionComponent[],
  };
  const loadedModules = new Set();

  const loader: Loader = (loadModules, beforeReplaceReducer) => {
    const multipleInjectMap = getMetadata(METADATA_KEY.multiple);
    const filteredModules = loadModules.filter((module) => {
      const serviceIdentifier =
        typeof module === 'function'
          ? module
          : typeof module === 'object'
          ? module.provide
          : undefined;
      if (serviceIdentifier) {
        return (
          multipleInjectMap.has(serviceIdentifier) ||
          (!multipleInjectMap.has(serviceIdentifier) &&
            !container.isBound(serviceIdentifier))
        );
      }
      return true;
    });
    bindModules(container, filteredModules);
    createStore({
      modules: filteredModules,
      container,
      ServiceIdentifiers,
      loadedModules,
      load: loader,
      dynamicModules,
      pluginHooks,
      preloadedState: undefined,
      devOptions,
      // eslint-disable-next-line no-use-before-define
      originalStore: store,
      beforeReplaceReducer: () => {
        beforeReplaceReducer?.(container);
      },
      modulesMap,
    });
  };

  const store = createStore({
    modules,
    container,
    ServiceIdentifiers,
    loadedModules,
    load: loader,
    dynamicModules,
    pluginHooks,
    preloadedState,
    devOptions,
    modulesMap,
  });
  const withoutReducers = store.getState() === null;
  const instance = container.get<T>(
    typeof main === 'object' ? main.provide : main
  );

  return {
    /**
     * App's main module instance.
     */
    instance,
    /**
     * The container for modules collection
     */
    container,
    /**
     * Redux store.
     */
    store: withoutReducers ? null : store,
    /**
     * all modules collection
     */
    modules: (instance as any as Service)[modulesKey]!,
    /**
     * destroy all subscriptions
     */
    destroy: () => {
      const modulesMap = (instance as any as Service)[modulesKey]!;
      Object.keys(modulesMap).forEach((key) => {
        const module = modulesMap[key] as Service | null | undefined;
        const unsubscriptions = module?.[unsubscriptionsKey];
        if (unsubscriptions) {
          for (const unsubscribe of unsubscriptions) {
            unsubscribe();
          }
        }
      });
    },
    /**
     * Bootstrap app with a renderer.
     */
    bootstrap(...args) {
      if (!(instance instanceof ViewModule)) {
        throw new Error(`Main module should be a 'ViewModule'.`);
      }
      const callback = args[0];
      const InstanceElement =
        typeof callback === 'function' ? (
          (callback(instance.component) as JSX.Element)
        ) : (
          <instance.component />
        );
      const RootElement = pluginHooks.provider
        .reverse()
        .reduce(
          (WrappedComponent, ProviderComponent) => (
            <ProviderComponent>{WrappedComponent}</ProviderComponent>
          ),
          InstanceElement
        );
      const element = withoutReducers ? (
        <ContainerContext.Provider value={container}>
          {RootElement}
        </ContainerContext.Provider>
      ) : (
        <ContainerContext.Provider value={container}>
          <Provider store={store}>{RootElement}</Provider>
        </ContainerContext.Provider>
      );
      return render(
        devOptions?.strict ? <StrictMode>{element}</StrictMode> : element,
        ...args
      );
    },
  };
}

export { createApp };
