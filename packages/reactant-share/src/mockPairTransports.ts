import { createTransport, mockPairPorts } from 'data-transport';

/**
 * mock pair transports
 */
export const mockPairTransports = () => {
  const [serverPort, clientPort] = mockPairPorts();
  return [
    createTransport('Base', serverPort),
    createTransport('Base', clientPort),
  ];
};
