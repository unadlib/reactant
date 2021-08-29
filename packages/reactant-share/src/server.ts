/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { App, containerKey, Container } from 'reactant';
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
import { proxyClient } from './proxyClient';
import { checkPatches } from './checkPatches';

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
    transport.listen(preloadedStateActionName, async () =>
      app.store?.getState()
    )
  );
  disposeListeners.push(
    transport.listen(loadFullStateActionName, async (sequence) =>
      lastAction.sequence > sequence ? app.store?.getState() : null
    )
  );
  disposeListeners.push(
    transport.listen(proxyClientActionName, async (options) => {
      const result = await proxyClient(app, options);
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
        if (lastAction.lastAction) {
          const { _inversePatches: _, ...action } = lastAction.lastAction;
          if (__DEV__ && enablePatchesChecker) {
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
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
