/* eslint-disable consistent-return */
import { App as BaseApp, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { Transport } from 'data-transport';
import { CallbackWithHook } from './interfaces';
import {
  lastActionName,
  preloadedStateActionName,
  proxyClientActionName,
} from './constants';
import { setPort } from './port';

export const serverCallbacks = new Set<CallbackWithHook>();

export const onServer = (callback: CallbackWithHook) => {
  try {
    callback();
  } catch (e) {
    console.error(e);
  }
  serverCallbacks.add(callback);
  return () => {
    serverCallbacks.delete(callback);
  };
};

export const handleServer = (
  app: BaseApp<any>,
  transport: Transport,
  disposeClient?: () => void
) => {
  disposeClient?.();
  setPort({ server: app }, serverCallbacks);
  const container = app.instance[containerKey];
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen(preloadedStateActionName, () => app.store?.getState())
  );
  disposeListeners.push(
    transport.listen(
      proxyClientActionName,
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
        transport.emit({ name: lastActionName, respond: false }, lastAction);
      }
    })
  );
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
