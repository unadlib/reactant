import { App as BaseApp } from 'reactant';
import { Transport } from 'data-transport';
import { getClientTransport } from './createTransport';
import { getServer } from './server';

export const proxyClient = ({
  module,
  method,
  args,
}: {
  module: string;
  method: string;
  args: any[];
}) => {
  if (!getServer()) {
    const clientTransport = getClientTransport();
    if (clientTransport) {
      return clientTransport.emit('proxyClient', { module, method, args });
    }
  }
  return Promise.reject(new Error(`error`));
};

export const handleClient = (
  getApp: () => BaseApp<any>,
  transport: Transport,
  disposeServer?: () => void
) => {
  disposeServer?.();
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen('lastAction', (lastAction: any) => {
      getApp()?.store?.dispatch(lastAction);
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
