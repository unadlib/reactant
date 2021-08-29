import { createSharedApp, injectable, state, action, proxy } from 'reactant-share';
import { mockPairPorts, createTransport } from 'data-transport';

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

(async () => {
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

  const client = await createSharedApp({
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

  await client.instance.increase();

  expect(client.instance.count).toBe(1);
  expect(server.instance.count).toBe(1);

  global.done();
})();
