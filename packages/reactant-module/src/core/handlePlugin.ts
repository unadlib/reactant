import type { ReducersMapObject, Reducer } from 'redux';
import { PluginModule } from './plugin';
import { PluginHooks, HandlePlugin } from '../interfaces';

export const handlePlugin: HandlePlugin = (
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
      pluginHooks.preloadedStateHandler.push((preloadedState: any) =>
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
