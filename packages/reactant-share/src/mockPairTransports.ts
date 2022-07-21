import { createTransport, mockPorts } from 'data-transport';

/**
 * mock pair transports
 */
export const mockPairTransports = () => {
  const { create, main } = mockPorts();
  return [createTransport('Base', main), createTransport('Base', create())];
};
