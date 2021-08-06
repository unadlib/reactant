/* eslint-disable consistent-return */
import { App as BaseApp, containerKey, ThisService, Container } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { Transport } from 'data-transport';
import { CallbackWithHook } from './interfaces';
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
  app: BaseApp<any>,
  transport: Transport,
  disposeClient?: () => void
) => {
  disposeClient?.();
  setPort({ server: app }, serverCallbacks);
  const container: Container = app.instance[containerKey];
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(transport.listen(isClientName, () => true));
  disposeListeners.push(
    transport.listen(preloadedStateActionName, () => app.store?.getState())
  );
  disposeListeners.push(
    transport.listen(
      proxyClientActionName,
      async (options: { module: string; method: string; args: any[] }) => {
        let module: ThisService | undefined = container.get(options.module);
        if (!module) {
          const matches = options.module.match(/\d+$/g);
          if (!matches) {
            throw new Error(``);
          }
          const [index] = matches;
          const name = options.module.replace(new RegExp(`${index}$`), '');
          const modules = container.getAll(name);
          if (!Array.isArray(modules) || modules.length) {
            throw new Error(``);
          }
          module = modules[Number(index)] as ThisService;
        }
        const method = module[options.method];
        const result = await method.apply(module, options.args);
        return result;
      }
    )
  );
  disposeListeners.push(() => transport.dispose());
  disposeListeners.push(
    app.store?.subscribe(() => {
      const {
        lastAction: { _inversePatches: _, ...lastAction },
      }: LastAction = container.get(LastAction);
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
