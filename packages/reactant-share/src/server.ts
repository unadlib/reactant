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
      let module = container.get<ThisService | undefined>(options.module);
      if (!module) {
        const matches = options.module.match(/\d+$/g);
        if (!matches) {
          throw new Error(`The module '${options.module}' does not exist.`);
        }
        const [index] = matches;
        const name = options.module.replace(new RegExp(`${index}$`), '');
        const modules = container.getAll(name);
        if (!Array.isArray(modules) || modules.length) {
          throw new Error(
            `The module '${options.module}' is not a multiple instances injected module, and it does not exist.`
          );
        }
        module = modules[Number(index)] as ThisService;
      }
      const method = module[options.method];
      const result = await method.apply(module, options.args);
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
