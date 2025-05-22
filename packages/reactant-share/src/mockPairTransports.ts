import {
  createTransport,
  mockPorts,
  type TransportOptions,
} from 'data-transport';

/**
 * mock pair transports
 */
export const mockPairTransports = (options?: {
  serverLogger?: TransportOptions['logger'];
  serverVerbose?: boolean;
  clientLogger?: TransportOptions['logger'];
  clientVerbose?: boolean;
}) => {
  const { create, main } = mockPorts();
  return [
    createTransport('Base', {
      ...main,
      logger: options?.serverLogger,
      verbose: options?.serverVerbose,
    }),
    createTransport('Base', {
      ...create(),
      logger: options?.clientLogger,
      verbose: options?.clientVerbose,
    }),
  ];
};
