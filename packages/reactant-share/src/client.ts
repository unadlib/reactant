import { actionIdentifier, App, Container, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { getClientTransport } from './createTransport';
import { CallbackWithHook, Transports } from './interfaces';
import {
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
} from './constants';
import { detectClient, setPort } from './port';
import { proxy } from './proxy';

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

let syncFullStatePromise: Promise<Record<string, any>> | null;

export const handleClient = (
  app: App<any>,
  transport: Transports['client'],
  disposeServer?: () => void
) => {
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
        // TODO: think about using patches
        proxy(container, {
          module: options.type as string,
          method: options.method!,
          args: options.params,
        });
        lastAction.sequence = options._sequence;
      } else if (!syncFullStatePromise) {
        syncFullStatePromise = transport.emit(loadFullStateActionName);
        const fullState = await syncFullStatePromise;
        syncFullStatePromise = null;
        app.store!.dispatch({
          type: `${actionIdentifier}_${loadFullStateActionName}`,
          state: fullState,
          _reactant: actionIdentifier,
        });
        lastAction.sequence = fullState[lastAction.stateKey]._sequence;
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
