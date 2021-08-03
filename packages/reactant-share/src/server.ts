/* eslint-disable consistent-return */
import { App as BaseApp, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { Transport } from 'data-transport';
import { serverCallbacks } from './share';

let server: BaseApp<any> | undefined;

export const getServer = () => server;

export const setServer = (app: BaseApp<any> | undefined) => {
  server = app;
  if (!app) return;
  for (const [_, callbacks] of serverCallbacks) {
    for (const callback of callbacks) {
      try {
        callback();
      } catch (e) {
        //
      }
    }
  }
};

export const handleServer = (
  getApp: () => BaseApp<any>,
  transport: Transport,
  disposeClient?: () => void
) => {
  disposeClient?.();
  const app = getApp();
  setServer(app);
  const container = app.instance[containerKey];
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen('preloadedState', () => app.store?.getState())
  );
  disposeListeners.push(
    transport.listen(
      'proxyFunction',
      async (options: { module: string; method: string; args: any[] }) => {
        const module = container.get(options.module);
        const method = module[options.method];
        const result = await method.apply(module, options.args);
        return result;
      }
    )
  );
  disposeListeners.push(() => transport.dispose());
  disposeListeners.push(
    app.store?.subscribe(() => {
      const { lastAction }: LastAction = container.get(LastAction);
      if (lastAction) {
        transport.emit({ name: 'lastAction', respond: false }, lastAction);
      }
    })
  );
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
