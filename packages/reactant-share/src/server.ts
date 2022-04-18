/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { containerKey, actionIdentifier } from 'reactant';
import type { Container } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { HandleServerOptions } from './interfaces';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
  proxyServerActionName,
} from './constants';
import { PortDetector } from './portDetector';
import { checkPatches } from './checkPatches';
import { applyMethod } from './applyMethod';

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
      const result = applyMethod(app, options);
      if (options.parallel) {
        transport.emit(
          { name: proxyServerActionName, respond: false },
          options
        );
      }
      if (result instanceof Promise) {
        const value = await result;
        return value;
      }
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
