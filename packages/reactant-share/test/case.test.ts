/* eslint-disable @typescript-eslint/no-empty-function */
import { mockPairPorts, createTransport } from 'data-transport';
import { createSharedApp, injectable, state, action, proxy } from '..';

@injectable({
  name: 'counter',
})
class Counter {
  @state
  count = 0;

  @action
  _increase() {
    this.count += 1;
  }

  @proxy
  async increase() {
    this._increase();
  }
}

test('base: sync up full state', async () => {
  const ports = mockPairPorts();

  const server = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: createTransport('Base', ports[0]),
      },
    },
  });

  await server.instance.increase();
  expect(server.instance.count).toBe(1);
  await server.instance.increase();
  expect(server.instance.count).toBe(2);

  const client0 = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'client',
      transports: {
        client: createTransport('Base', ports[1]),
      },
    },
  });
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await client0.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await server.instance.increase();
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);
});

test('sync up full state and update from server', async () => {
  const ports = mockPairPorts();

  const server = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: createTransport('Base', ports[0]),
      },
    },
  });

  await server.instance.increase();
  expect(server.instance.count).toBe(1);
  await server.instance.increase();
  expect(server.instance.count).toBe(2);

  const client0 = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'client',
      transports: {
        client: createTransport('Base', ports[1]),
      },
    },
  });
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await server.instance.increase();
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);
});
