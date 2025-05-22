import { BroadcastChannel } from 'broadcast-channel';
import {
  createTransport,
  Transport,
  type TransportOptions,
} from 'data-transport';

export const createBroadcastTransport = (
  name: string,
  verbose?: boolean,
  logger?: TransportOptions['logger']
) => {
  const broadcastChannel = new BroadcastChannel(
    `reactant-share-channel:${name}`
  );
  const transport = createTransport('Base', {
    listener: (callback) => {
      broadcastChannel.onmessage = (data) => {
        callback(JSON.parse(data));
      };
      return () => {
        broadcastChannel.onmessage = null;
        return broadcastChannel.close();
      };
    },
    sender: (message) => broadcastChannel.postMessage(JSON.stringify(message)),
    prefix: `reactant-share:${name}`,
    verbose,
    logger,
  });
  return transport;
};

export { Transport };
