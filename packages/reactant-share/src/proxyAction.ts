import { getClientTransport } from './createTransport';
import { getIsServer } from './serverChecker';

export const proxyAction = ({
  module,
  method,
  args,
}: {
  module: string;
  method: string;
  args: any[];
}) => {
  if (!getIsServer()) {
    const clientTransport = getClientTransport();
    if (clientTransport) {
      return clientTransport.emit('proxyFunction', { module, method, args });
    }
  }
  return Promise.reject(new Error(`error`));
};
