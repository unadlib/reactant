import { BroadcastChannel } from 'broadcast-channel';
import { createTransport, Transport } from 'data-transport';

let clientTransport: Transport | undefined;

export const getClientTransport = () => clientTransport;

export const setClientTransport = (transport: Transport) => {
  clientTransport = transport;
};

export const createBroadcastTransport = (name: string) => {
  const broadcastChannel = new BroadcastChannel(
    `reactant-shared-app-channel:${name}`
  );
  const transport = createTransport('Base', {
    listener: (callback) => {
      broadcastChannel.onmessage = (data) => {
        callback(data);
      };
    },
    sender: (message) => broadcastChannel.postMessage(message),
    prefix: `reactant-shared-app:${name}`,
  });
  return transport;
};
