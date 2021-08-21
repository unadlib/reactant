import {
  actionIdentifier,
  applyPatches,
  Container,
  containerKey,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import { HandleClientOptions, ProxyClientOptions } from './interfaces';
import { lastActionName, proxyClientActionName } from './constants';
import { PortDetector } from './portDetector';
import { filterPatches } from './filterPatches';

export const proxyClient = ({
  module,
  method,
  args,
  clientTransport,
}: ProxyClientOptions) => {
  if (clientTransport) {
    return clientTransport.emit(proxyClientActionName, {
      module,
      method,
      args,
    });
  }
  return Promise.reject(
    new Error(`Detected that the current port is not a client.`)
  );
};

export const handleClient = ({
  app,
  transport,
  disposeServer,
  enablePatchesFilter,
  preloadedState,
}: HandleClientOptions) => {
  if (!transport) {
    throw new Error(`The client transport does not exist.`);
  }
  disposeServer?.();
  const container: Container = app.instance[containerKey];
  const lastAction = container.get(LastAction);
  const portDetector = container.get(PortDetector);
  portDetector.setPort({ client: app }, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  let lastState: Record<string, any>;
  if (enablePatchesFilter) {
    lastState = app.store!.getState();
    disposeListeners.push(() =>
      app.store?.subscribe(() => {
        lastState = app.store!.getState();
      })
    );
  }
  if (preloadedState) {
    lastAction.sequence = preloadedState[lastAction.stateKey]._sequence;
  }
  disposeListeners.push(
    transport.listen(lastActionName, async (options) => {
      if (options._sequence && options._sequence === lastAction.sequence + 1) {
        if (options._reactant === actionIdentifier) {
          const patches = enablePatchesFilter
            ? filterPatches(lastState, options)
            : options._patches;
          const state = applyPatches(app.store!.getState(), patches!);
          app.store!.dispatch({ ...options, state });
        } else {
          app.store!.dispatch(options);
        }
        lastAction.sequence = options._sequence;
      } else {
        portDetector.syncFullState();
      }
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
