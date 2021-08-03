import { getClientTransport } from './createTransport';
import { getServer } from './server';

export const proxyAction = ({
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
      return clientTransport.emit('proxyFunction', { module, method, args });
    }
  }
  return Promise.reject(new Error(`error`));
};
