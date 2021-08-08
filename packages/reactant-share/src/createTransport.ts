import { BroadcastChannel } from 'broadcast-channel';
import { createTransport } from 'data-transport';
import { Transports } from './interfaces';

let clientTransport: Transports['client'];

export const getClientTransport = () => clientTransport;

export const setClientTransport = (transport: Transports['client']) => {
  clientTransport = transport;
};

export const createBroadcastTransport = (name: string) => {
  const broadcastChannel = new BroadcastChannel(
    `reactant-share-channel:${name}`
  );
  const transport = createTransport('Base', {
    listener: (callback) => {
      broadcastChannel.onmessage = (data) => {
        callback(data);
      };
    },
    sender: (message) => broadcastChannel.postMessage(message),
    prefix: `reactant-share:${name}`,
  });
  return transport;
};
