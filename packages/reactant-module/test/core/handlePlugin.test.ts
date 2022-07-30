/* eslint-disable lines-between-class-members */
import { handlePlugin, PluginModule, Store } from '../..';

test('base `handlePlugin` with invalid service', () => {
  for (const item of [
    {},
    [],
    function () {
      //
    },
    () => {
      //
    },
  ]) {
    const pluginHooks = {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    };
    handlePlugin(item, pluginHooks);
    Object.entries(pluginHooks).forEach(([_, hooks]) => {
      expect(hooks.length).toBe(0);
    });
  }
});

test('base `handlePlugin` with valid service', () => {
  for (const item of [
    {
      service: new (class extends PluginModule {
        middleware = () => () => () => null;
        beforeCombineRootReducers = () => ({});
        afterCombineRootReducers = () => () => null;
        enhancer = () => null;
        preloadedStateHandler = () => ({});
        afterCreateStore = (store: Store) => store;
        provider = () => null;
      })(),
      length: {
        middleware: 1,
        beforeCombineRootReducers: 1,
        afterCombineRootReducers: 1,
        enhancer: 1,
        preloadedStateHandler: 1,
        afterCreateStore: 1,
        provider: 1,
      },
    },
  ]) {
    const pluginHooks = {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    };
    handlePlugin(item.service, pluginHooks);
    Object.entries(pluginHooks).forEach(([key, hooks]) => {
      expect(hooks.length).toBe((item.length as any)[key]);
    });
  }
});
