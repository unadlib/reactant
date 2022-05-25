import {
  actionIdentifier,
  applyPatches,
  Container,
  containerKey,
} from 'reactant';
import { LastAction } from 'reactant-last-action';
import { HandleClientOptions } from './interfaces';
import { lastActionName, proxyServerActionName } from './constants';
import { PortDetector } from './portDetector';
import { filterPatches } from './filterPatches';
import { applyMethod } from './applyMethod';

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
  if (preloadedState) {
    lastAction.sequence = preloadedState[lastAction.stateKey]._sequence;
  }
  disposeListeners.push(
    transport.listen(lastActionName, async (action) => {
      if (action._sequence && action._sequence === lastAction.sequence + 1) {
        if (action._reactant === actionIdentifier) {
          const currentState = app.store!.getState();
          // support subset of modules sync up
          const patches = enablePatchesFilter
            ? action._patches!.filter((item) => currentState[item.path[0]])
            : action._patches!;
          let time: number;
          if (__DEV__) {
            // performance checking
            time = Date.now();
          }
          const state = applyPatches(currentState, patches);
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
        portDetector.syncFullState({ forceSync: false });
      }
    })
  );
  disposeListeners.push(
    transport.listen(proxyServerActionName, async (options) => {
      const result = await applyMethod(app, options);
      return result;
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
