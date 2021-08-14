import { App, applyPatches, Container, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { getClientTransport } from './createTransport';
import { CallbackWithHook, Transports } from './interfaces';
import { lastActionName, proxyClientActionName } from './constants';
import { PortDetector, setPort } from './port';
import { syncFullState } from './syncFullState';

export const clientCallbacks = new Set<CallbackWithHook>();

export const onClient = (callback: CallbackWithHook) => {
  if (typeof callback !== 'function') {
    throw new Error(`'onServer' argument should be a function.`);
  }
  clientCallbacks.add(callback);
  return () => {
    clientCallbacks.delete(callback);
  };
};

export const proxyClient = ({
  module,
  method,
  args,
}: {
  module: string;
  method: string;
  args: any[];
}) => {
  const clientTransport = getClientTransport();
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
}: {
  app: App<any>;
  transport: Transports['client'];
  disposeServer?: () => void;
}) => {
  if (!transport) {
    throw new Error(`The client transport does not exist.`);
  }
  disposeServer?.();
  const container: Container = app.instance[containerKey];
  const portDetector = container.get(PortDetector);
  portDetector.setPort({ client: app }, clientCallbacks, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen(lastActionName, async (options) => {
      const lastAction = container.get(LastAction);
      if (options._sequence && options._sequence === lastAction.sequence + 1) {
        if (__DEV__) {
          const oldStateTree = app.store!.getState();
          options._patches!.forEach(({ op, path, value }) => {
            if (
              op === 'replace' &&
              (toString.call(value) === '[object Object]' ||
                Array.isArray(value))
            ) {
              const oldState = path.reduce(
                (state, _path) => state?.[_path],
                oldStateTree
              );
              if (oldState && typeof oldState === 'object') {
                const length = Array.isArray(oldState)
                  ? oldState.length
                  : Object.keys(oldState).length ?? 0;
                if (length > 0) {
                  const state = path.join('.');
                  throw new Error(
                    `The state '${state}' operation is a replacement update operation, be sure to check the method '${
                      options.method
                    }' of the module '${String(
                      options.type
                    )}' about the state '${state}' update operation and use mutation updates to ensure the minimum set of update patches.`
                  );
                }
              }
            }
          });
        }
        const state = applyPatches(app.store!.getState(), options._patches!);
        app.store!.dispatch({ ...options, state });
        lastAction.sequence = options._sequence;
      } else {
        syncFullState({
          app,
          transport,
        });
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
