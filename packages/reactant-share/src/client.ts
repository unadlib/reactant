import {
  actionIdentifier,
  applyPatches,
  Container,
  containerKey,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import { HandleClientOptions } from './interfaces';
import { lastActionName, proxyServerActionName } from './constants';
import { PortDetector } from './modules/portDetector';
import { applyMethod } from './applyMethod';

export const handleClient = ({
  app,
  transport,
  disposeServer,
  disposeClient,
  enablePatchesFilter,
  preloadedState,
}: HandleClientOptions) => {
  if (!transport) {
    throw new Error(`The client transport does not exist.`);
  }
  disposeServer?.();
  disposeClient?.();
  const container: Container = app.instance[containerKey];
  const lastAction = container.get(LastAction);
  const portDetector = container.get(PortDetector);
  portDetector.setPort({ client: app }, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  if (preloadedState) {
    lastAction.sequence = preloadedState[lastAction.stateKey]._sequence;
  }
  disposeListeners.push(
    transport.listen(lastActionName, async (action) => {
      if (portDetector.disableSyncClient) return;
      if (action._sequence && action._sequence === lastAction.sequence + 1) {
        if (action._reactant === actionIdentifier) {
          const currentState = app.store!.getState();
          // support subset of modules sync up
          const patches = enablePatchesFilter
            ? action._patches!.filter((item) => currentState[item.path[0]])
            : action._patches!;
          const state = applyPatches(currentState, patches);
          app.store!.dispatch({ ...action, state });
        } else {
          app.store!.dispatch(action);
        }
        lastAction.sequence = action._sequence;
      } else {
        portDetector.syncFullState({ forceSync: false });
      }
    })
  );
  disposeListeners.push(
    transport.listen(
      proxyServerActionName,
      async ({ clientIds, portName, ...options }) => {
        // ignore non-specified id or name of client
        if (
          (Array.isArray(clientIds) &&
            portDetector.clientId &&
            !clientIds.includes(portDetector.clientId)) ||
          (portName && portName !== portDetector.name)
        )
          return new Promise(() => {
            // never resolve
          });
        const result = await applyMethod(app, options);
        return result;
      }
    )
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
