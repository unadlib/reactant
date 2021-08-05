import { App as BaseApp, applyPatches } from 'reactant';
import { Transport } from 'data-transport';
import { getClientTransport } from './createTransport';
import { CallbackWithHook } from './interfaces';
import { lastActionName, proxyClientActionName } from './constants';
import { detectPort, setPort } from './port';

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
  if (detectPort('client')) {
    const clientTransport = getClientTransport();
    if (clientTransport) {
      return clientTransport.emit(proxyClientActionName, {
        module,
        method,
        args,
      });
    }
  }
  return Promise.reject(new Error(`error`));
};

export const handleClient = (
  app: BaseApp<any>,
  transport: Transport,
  disposeServer?: () => void
) => {
  disposeServer?.();
  setPort({ client: app }, clientCallbacks);
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen(lastActionName, (lastAction: any) => {
      const state = applyPatches(app.store?.getState(), lastAction._patches);
      app.store?.dispatch({ ...lastAction, state });
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
