/* eslint-disable no-param-reassign */
import { ReducersMapObject, Reducer, PreloadedState } from 'redux';
import { type FunctionComponent } from 'react';
import { PluginModule } from './plugin';
import { PluginHooks, HandlePlugin } from '../interfaces';

export const generatePluginHooks = (): PluginHooks => ({
  middleware: [],
  beforeCombineRootReducers: [],
  afterCombineRootReducers: [],
  enhancer: [],
  preloadedStateHandler: [],
  afterCreateStore: [],
  provider: [] as FunctionComponent[],
});

export const mergePluginHooks = (
  pluginHooks: PluginHooks,
  _assignPluginHooks: PluginHooks,
  _pushPluginHooks: PluginHooks
) => {
  Object.keys(pluginHooks).forEach((key) => {
    const assignPluginHooks = _assignPluginHooks[
      key as keyof PluginHooks
    ].filter(Boolean) as any[];
    const pushPluginHooks = _pushPluginHooks[key as keyof PluginHooks] as any[];
    pluginHooks[key as keyof PluginHooks].push(
      ...assignPluginHooks,
      ...pushPluginHooks
    );
  });
};

export const assignPlugin: HandlePlugin = (
  service: any,
  pluginHooks: PluginHooks,
  index: number
) => {
  if (service instanceof PluginModule) {
    if (typeof service.beforeCombineRootReducers === 'function') {
      pluginHooks.beforeCombineRootReducers[index] = (
        reducers: ReducersMapObject
      ) => service.beforeCombineRootReducers!(reducers);
    }
    if (typeof service.afterCombineRootReducers === 'function') {
      pluginHooks.afterCombineRootReducers[index] = (rootReducer: Reducer) =>
        service.afterCombineRootReducers!(rootReducer);
    }
    if (typeof service.preloadedStateHandler === 'function') {
      pluginHooks.preloadedStateHandler[index] = (
        preloadedState: PreloadedState<any>
      ) => service.preloadedStateHandler!(preloadedState);
    }
    if (typeof service.enhancer === 'function') {
      pluginHooks.enhancer[index] = service.enhancer.bind(service);
    }
    if (typeof service.middleware === 'function') {
      pluginHooks.middleware[index] = service.middleware.bind(service);
    }
    if (typeof service.afterCreateStore === 'function') {
      pluginHooks.afterCreateStore[index] =
        service.afterCreateStore.bind(service);
    }
    if (typeof service.provider === 'function') {
      pluginHooks.provider[index] = service.provider.bind(service);
    }
  }
};

export const pushPlugin: HandlePlugin = (
  service: any,
  pluginHooks: PluginHooks
) => {
  if (service instanceof PluginModule) {
    if (typeof service.beforeCombineRootReducers === 'function') {
      pluginHooks.beforeCombineRootReducers.push(
        (reducers: ReducersMapObject) =>
          service.beforeCombineRootReducers!(reducers)
      );
    }
    if (typeof service.afterCombineRootReducers === 'function') {
      pluginHooks.afterCombineRootReducers.push((rootReducer: Reducer) =>
        service.afterCombineRootReducers!(rootReducer)
      );
    }
    if (typeof service.preloadedStateHandler === 'function') {
      pluginHooks.preloadedStateHandler.push(
        (preloadedState: PreloadedState<any>) =>
          service.preloadedStateHandler!(preloadedState)
      );
    }
    if (typeof service.enhancer === 'function') {
      pluginHooks.enhancer.push(service.enhancer.bind(service));
    }
    if (typeof service.middleware === 'function') {
      pluginHooks.middleware.push(service.middleware.bind(service));
    }
    if (typeof service.afterCreateStore === 'function') {
      pluginHooks.afterCreateStore.push(service.afterCreateStore.bind(service));
    }
    if (typeof service.provider === 'function') {
      pluginHooks.provider.push(service.provider.bind(service));
    }
  }
};
