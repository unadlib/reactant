import { ReducersMapObject, Reducer, PreloadedState } from 'redux';
import { PluginModule } from './plugin';
import { PluginHooks } from '../interfaces';

export const handlePlugin = (service: any, pluginHooks: PluginHooks) => {
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
    if (typeof service.provider === 'function') {
      pluginHooks.provider.push(service.provider.bind(service));
    }
  }
};
