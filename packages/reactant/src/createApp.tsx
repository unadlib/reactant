/* eslint-disable no-shadow */
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import {
  createContainer,
  ViewModule,
  createStore,
  ServiceIdentifiersMap,
  bindModules,
  Loader,
  PluginHooks,
} from 'reactant-module';
import { Config, App } from './interfaces';

/**
 * ## Description
 *
 * You can create an app with `createApp()` passing app configuration,
 * which will return an object including `instance`, `store`,
 * and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).
 *
 * ## Example
 *
 * ```ts
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
function createApp<T>({
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
  modules = [],
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
}: Config<T>): App<T> {
  let loader: Loader;
  const ServiceIdentifiers: ServiceIdentifiersMap = new Map();
  const container = createContainer({
    ServiceIdentifiers,
    modules: [main, ...modules],
    options: {
      defaultScope: 'Singleton',
      ...containerOptions,
      skipBaseClassChecks: true,
    },
  });
  const instance = container.get<T>(
    typeof main === 'object' ? main.provide : main
  );
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
  const store = createStore(
    modules,
    container,
    ServiceIdentifiers,
    loadedModules,
    (...args: Parameters<Loader>) => {
      loader(...args);
    },
    pluginHooks,
    preloadedState,
    devOptions
  );
  const withoutReducers = store.getState() === null;
  loader = (loadModules, beforeReplaceReducer) => {
    bindModules(container, loadModules);
    createStore(
      loadModules,
      container,
      ServiceIdentifiers,
      loadedModules,
      loader,
      pluginHooks,
      undefined,
      devOptions,
      store,
      () => {
        beforeReplaceReducer?.(container);
      }
    );
  };
  return {
    /**
     * App's main module instance.
     */
    instance,
    /**
     * Redux store.
     */
    store: withoutReducers ? null : store,
    /**
     * bootstrap app with renderer.
     */
    bootstrap(...args: unknown[]): Element | void {
      if (!(instance instanceof ViewModule)) {
        throw new Error(`Main module should be a 'ViewModule'.`);
      }
      const InstanceElement = <instance.component />;
      const RootElement = pluginHooks.provider
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
