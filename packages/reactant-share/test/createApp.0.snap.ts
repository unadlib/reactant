import { createSharedApp, injectable, state, action, delegate, mockPairTransports } from 'reactant-share';

@injectable({
  name: 'counter',
})
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

export default async () => {
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

  const client = await createSharedApp({
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

  await delegate(client.instance, 'increase', []);

  expect(client.instance.count).toBe(1);
  expect(server.instance.count).toBe(1);
};
