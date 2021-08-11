import { App, applyPatches, Container, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { getClientTransport } from './createTransport';
import { CallbackWithHook, Transports } from './interfaces';
import { lastActionName, proxyClientActionName } from './constants';
import { detectClient, setPort } from './port';
import { proxy } from './proxy';
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
  if (detectClient()) {
    const clientTransport = getClientTransport();
    if (clientTransport) {
      return clientTransport.emit(proxyClientActionName, {
        module,
        method,
        args,
      });
    }
  }
  return Promise.reject(
    new Error(`Detected that the current port is not a client.`)
  );
};

export const handleClient = ({
  app,
  transport,
  disposeServer,
  enablePatches,
}: {
  app: App<any>;
  transport: Transports['client'];
  disposeServer?: () => void;
  enablePatches?: boolean;
}) => {
  if (!transport) {
    throw new Error(`The client transport does not exist.`);
  }
  disposeServer?.();
  setPort({ client: app }, clientCallbacks, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen(lastActionName, async (options) => {
      const container: Container = app.instance[containerKey];
      const lastAction = container.get(LastAction);
      if (options._sequence && options._sequence === lastAction.sequence + 1) {
        if (enablePatches) {
          if (!Array.isArray(options._patches)) {
            throw new Error(
              `The server port is not set '{ enablePatches: true }' in 'createApp()' devOptions.`
            );
          }
          const state = applyPatches(app.store!.getState(), options._patches!);
          app.store!.dispatch({ ...options, state });
        } else {
          proxy(container, {
            module: options.type as string,
            method: options.method!,
            args: options.params,
          });
        }
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
