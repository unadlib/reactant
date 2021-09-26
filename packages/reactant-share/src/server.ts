/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { containerKey, actionIdentifier, modulesKey } from 'reactant';
import type { App, ThisService, Container } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { HandleServerOptions } from './interfaces';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
} from './constants';
import { PortDetector } from './portDetector';
import { checkPatches } from './checkPatches';

const applyMethod = (
  app: App<any>,
  options: {
    module: string;
    method: string;
    args: any[];
  }
) => {
  const module: ThisService | undefined =
    app.instance[modulesKey][options.module];
  if (!module) {
    throw new Error(
      `The module '${options.module}' is not a multiple instances injected module, and it does not exist.`
    );
  }
  const method = module[options.method];
  if (typeof method !== 'function') {
    throw new Error(
      `The '${options.method}' method for module '${options.module}' does not exist.`
    );
  }
  return method.apply(module, options.args);
};

export const handleServer = ({
  app,
  transport,
  disposeClient,
  enablePatchesChecker,
}: HandleServerOptions) => {
  if (!transport) {
    throw new Error(`The server transport does not exist.`);
  }
  disposeClient?.();
  const container: Container = app.instance[containerKey];
  const lastAction = container.get(LastAction);
  const portDetector = container.get(PortDetector);
  portDetector.setPort({ server: app }, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(transport.listen(isClientName, async () => true));
  disposeListeners.push(
    transport.listen(
      preloadedStateActionName,
      () =>
        new Promise((resolve) => {
          portDetector.onRehydrate(() => resolve(app.store?.getState()));
        })
    )
  );
  disposeListeners.push(
    transport.listen(loadFullStateActionName, async (sequence) =>
      lastAction.sequence > sequence ? app.store?.getState() : null
    )
  );
  disposeListeners.push(
    transport.listen(proxyClientActionName, async (options) => {
      const result = await applyMethod(app, options);
      return result;
    })
  );
  disposeListeners.push(() => transport.dispose());
  let oldStateTree: Record<string, any>;
  if (__DEV__) {
    oldStateTree = app.store!.getState();
  }
  disposeListeners.push(
    app.store?.subscribe(() => {
      try {
        if (lastAction.action) {
          const { action } = lastAction;
          if (
            __DEV__ &&
            action?._reactant === actionIdentifier &&
            action._patches &&
            enablePatchesChecker
          ) {
            checkPatches(oldStateTree, action);
          }
          transport.emit({ name: lastActionName, respond: false }, action);
        }
      } finally {
        if (__DEV__) {
          oldStateTree = app.store!.getState();
        }
      }
    })
  );
  // app synchronizes state to all clients immediately after switching server port
  if (portDetector.previousPort === 'client') {
    portDetector.syncToClients();
  }
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
