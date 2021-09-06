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
    transport.listen(lastActionName, async (action) => {
      if (action._sequence && action._sequence === lastAction.sequence + 1) {
        if (action._reactant === actionIdentifier) {
          // TODO: think about filterPatches in server port
          const patches = enablePatchesFilter
            ? filterPatches(lastState, action)
            : action._patches;
          let time: number;
          if (__DEV__) {
            // performance checking
            time = Date.now();
          }
          const state = applyPatches(app.store!.getState(), patches!);
          if (__DEV__) {
            const executionTime = Date.now() - time!;
            if (executionTime > 100)
              console.warn(
                `The 'applyPatches()' execution time from the method '${
                  action.method
                }' in '${
                  action.type as string
                }' is ${executionTime} ms, it's recommended to use 'dispatch()' API.`
              );
            // performance detail: https://immerjs.github.io/immer/docs/performance
          }
          app.store!.dispatch({ ...action, state });
        } else {
          app.store!.dispatch(action);
        }
        lastAction.sequence = action._sequence;
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
