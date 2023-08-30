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
  proxyClientActionName,
} from './constants';
import { PortDetector } from './modules/portDetector';
import { PatchesChecker } from './modules/patchesChecker';
import { applyMethod } from './applyMethod';

export const handleServer = ({
  app,
  transport,
  disposeServer,
  disposeClient,
  enablePatchesChecker,
}: HandleServerOptions) => {
  if (!transport) {
    throw new Error(`The server transport does not exist.`);
  }
  disposeServer?.();
  disposeClient?.();
  const container: Container = app.instance[containerKey];
  const lastAction = container.get(LastAction);
  const portDetector = container.get(PortDetector);
  const patchesChecker: PatchesChecker | null = enablePatchesChecker
    ? container.get(PatchesChecker)
    : null;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (globalThis.SharedWorkerGlobalScope) {
    let executed = false;
    // before any other event, it should be connected with the first client
    globalThis.addEventListener('connect', () => {
      if (executed) return;
      executed = true;
      portDetector.setPort({ server: app }, transport);
    });
  } else {
    portDetector.setPort({ server: app }, transport);
  }
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(transport.listen(isClientName, async () => true));
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
          if (!portDetector.lastAction.options?.ignoreAction?.(action)) {
            if (
              __DEV__ &&
              enablePatchesChecker &&
              patchesChecker &&
              action?._reactant === actionIdentifier &&
              action._patches
            ) {
              patchesChecker.checkPatches(oldStateTree, action);
            }
            transport.emit({ name: lastActionName, respond: false }, action);
          }
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
