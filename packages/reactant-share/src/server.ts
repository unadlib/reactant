/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { App, containerKey, ThisService, Container } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { CallbackWithHook, Transports } from './interfaces';
import {
  isClientName,
  lastActionName,
  preloadedStateActionName,
  proxyClientActionName,
} from './constants';
import { setPort } from './port';
import { proxy } from './proxy';

export const serverCallbacks = new Set<CallbackWithHook>();

export const onServer = (callback: CallbackWithHook) => {
  if (typeof callback !== 'function') {
    throw new Error(`'onServer' argument should be a function.`);
  }
  serverCallbacks.add(callback);
  return () => {
    serverCallbacks.delete(callback);
  };
};

export const handleServer = (
  app: App<any>,
  transport: Transports['server'],
  disposeClient?: () => void
) => {
  if (!transport) {
    throw new Error(`The server transport does not exist.`);
  }
  disposeClient?.();
  setPort({ server: app }, serverCallbacks, transport);
  const container: Container = app.instance[containerKey];
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(transport.listen(isClientName, async () => true));
  disposeListeners.push(
    transport.listen(preloadedStateActionName, async () =>
      app.store?.getState()
    )
  );
  disposeListeners.push(
    transport.listen(proxyClientActionName, async (options) => {
      const result = await proxy(container, options);
      return result;
    })
  );
  disposeListeners.push(() => transport.dispose());
  disposeListeners.push(
    app.store?.subscribe(() => {
      const {
        lastAction: { _inversePatches: _, ...lastAction },
      } = container.get(LastAction);
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
