/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createSharedApp,
  injectable,
  state,
  action,
  spawn,
  mockPairTransports,
} from '..';

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

  async increase() {
    await spawn(this as Counter, '_increase', []);
  }
}

test('base: sync up full state', async () => {
  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: transports[0],
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
        client: transports[1],
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
  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: transports[0],
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
        client: transports[1],
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
