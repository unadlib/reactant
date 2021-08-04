import { App as BaseApp } from 'reactant';
import { Transport } from 'data-transport';
import { getClientTransport } from './createTransport';
import { CallbackWithHook } from './interfaces';
import { lastActionName, proxyClientActionName } from './constants';
import { checkPort, setPort } from './port';

export const clientCallbacks = new Set<CallbackWithHook>();

export const onClient = (callback: CallbackWithHook) => {
  try {
    callback();
  } catch (e) {
    console.error(e);
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
  if (checkPort('client')) {
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
      app.store?.dispatch(lastAction);
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
