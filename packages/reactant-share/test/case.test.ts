/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createSharedApp,
  injectable,
  state,
  action,
  spawn,
  mockPairTransports,
  ViewModule,
  PortDetector,
  fork,
} from '..';

const increaseSymbol = Symbol('increase');

@injectable({
  name: 'counter',
})
class Counter extends ViewModule {
  setValue = 0;

  set(setValue: number) {
    this.setValue = setValue;
  }

  @state
  count = 0;

  @action
  _increase() {
    this.count += 1;
  }

  @action
  add(num: number) {
    this.count += num;
  }

  async increase() {
    await spawn(this as Counter, '_increase', []);
  }

  [increaseSymbol]() {
    this._increase();
  }

  increaseFunc = () => {
    this._increase();
  };

  component() {
    return null;
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
  await client0.bootstrap();

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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await server.instance.increase();
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);
});

test('switch same port', async () => {
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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await client0.instance.increase();
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);

  const transports0 = mockPairTransports();

  const serverPortDetector = server.container.get(PortDetector);
  serverPortDetector.transform('server', transports0[0]);

  const clientPortDetector = client0.container.get(PortDetector);
  clientPortDetector.transform('client', transports0[1]);

  await server.instance.increase();
  expect(server.instance.count).toBe(5);
  expect(client0.instance.count).toBe(5);

  await client0.instance.increase();
  expect(server.instance.count).toBe(6);
  expect(client0.instance.count).toBe(6);
});

test('switch diff port', async () => {
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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await client0.instance.increase();
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);

  const transports0 = mockPairTransports();

  const portDetector0 = server.container.get(PortDetector);
  portDetector0.transform('client', transports0[0]);

  expect(portDetector0.isClient).toBeTruthy();

  const portDetector1 = client0.container.get(PortDetector);
  portDetector1.transform('server', transports0[1]);

  expect(portDetector1.isServer).toBeTruthy();

  await server.instance.increase();
  expect(server.instance.count).toBe(5);
  expect(client0.instance.count).toBe(5);

  await client0.instance.increase();
  expect(server.instance.count).toBe(6);
  expect(client0.instance.count).toBe(6);
});

test('spawn error case0', async () => {
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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await spawn(client0.instance, 'increaseFunc', []);
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);

  expect(() => {
    spawn(client0.instance, increaseSymbol, []);
  }).toThrowError();

  expect(() => {
    spawn(client0.instance, 'count' as any, []);
  }).toThrowError();

  expect(() => {
    // @ts-ignore
    spawn(client0.instance, 'increaseFunc');
  }).toThrowError();

  const portDetector1 = client0.container.get(PortDetector);
  portDetector1.transports.client = null as any;

  spawn(client0.instance, 'increaseFunc', [], { respond: true }).catch((e) => {
    expect(e).toEqual(
      new Error('Detected that the current client transport does not exist.')
    );
  });
});

test('spawn error case1', async () => {
  @injectable()
  class Counter1 extends ViewModule {
    @state
    count = 0;

    @action
    _increase() {
      this.count += 1;
    }

    async increase() {
      await spawn(this as Counter1, '_increase', []);
    }

    [increaseSymbol]() {
      this._increase();
    }

    increaseFunc = () => {
      this._increase();
    };

    component() {
      return null;
    }
  }

  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter1,
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

  expect(() => {
    spawn(server.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);

  const client0 = await createSharedApp({
    modules: [],
    main: Counter1,
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
  await client0.bootstrap();

  expect(() => {
    spawn(client0.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);
});

test('spawn error case2', async () => {
  @injectable({
    name: Symbol('counter') as any,
  })
  class Counter1 extends ViewModule {
    @state
    count = 0;

    @action
    _increase() {
      this.count += 1;
    }

    async increase() {
      await spawn(this as Counter1, '_increase', []);
    }

    [increaseSymbol]() {
      this._increase();
    }

    increaseFunc = () => {
      this._increase();
    };

    component() {
      return null;
    }
  }

  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter1,
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

  expect(() => {
    spawn(server.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);

  const client0 = await createSharedApp({
    modules: [],
    main: Counter1,
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
  await client0.bootstrap();

  expect(() => {
    spawn(client0.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);
});

test('spawn with args', async () => {
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

  await spawn(server.instance, 'add', [1]);
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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await spawn(client0.instance, 'add', [1]);
  expect(server.instance.count).toBe(4);
  expect(client0.instance.count).toBe(4);
});

test('fork error case0', async () => {
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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(0);
  expect(server.instance.count).toBe(0);

  await server.instance.increase();
  expect(server.instance.count).toBe(1);
  expect(client0.instance.count).toBe(1);

  await fork(server.instance, 'add', [1]);
  expect(server.instance.count).toBe(1);
  expect(client0.instance.count).toBe(2);

  await fork(server.instance, 'set', [1]);
  expect(server.instance.setValue).toBe(0);
  expect(client0.instance.setValue).toBe(1);

  expect(() => {
    fork(server.instance, increaseSymbol, []);
  }).toThrowError();

  expect(() => {
    fork(server.instance, 'count' as any, []);
  }).toThrowError();

  expect(() => {
    // @ts-ignore
    fork(server.instance, 'increaseFunc');
  }).toThrowError();

  const portDetector1 = server.container.get(PortDetector);
  portDetector1.transports.server = null as any;

  fork(server.instance, 'increaseFunc', [], { respond: true }).catch((e) => {
    expect(e).toEqual(
      new Error('Detected that the current server transport does not exist.')
    );
  });
});

test('fork error case1', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  @injectable()
  class Counter1 extends ViewModule {
    @state
    count = 0;

    @action
    _increase() {
      this.count += 1;
    }

    async increase() {
      await fork(this as Counter1, '_increase', []);
    }

    [increaseSymbol]() {
      this._increase();
    }

    increaseFunc = () => {
      this._increase();
    };

    component() {
      return null;
    }
  }

  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter1,
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

  expect(console.error).toHaveBeenCalled();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(console.error.mock.calls[0][0]).toContain(
    `The decorator for class Counter1 should set "@injectable({ name: 'Counter1' })".`
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.error.mockRestore();

  expect(() => {
    fork(server.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);

  const client0 = await createSharedApp({
    modules: [],
    main: Counter1,
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
  await client0.bootstrap();

  expect(() => {
    fork(server.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);

  expect(() => {
    fork(client0.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/should be running in server port/);
});

test('fork error case2', async () => {
  @injectable({
    name: Symbol('counter') as any,
  })
  class Counter1 extends ViewModule {
    @state
    count = 0;

    @action
    _increase() {
      this.count += 1;
    }

    async increase() {
      await fork(this as Counter1, '_increase', []);
    }

    [increaseSymbol]() {
      this._increase();
    }

    increaseFunc = () => {
      this._increase();
    };

    component() {
      return null;
    }
  }

  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter1,
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

  expect(() => {
    fork(server.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);

  const client0 = await createSharedApp({
    modules: [],
    main: Counter1,
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
  await client0.bootstrap();

  expect(() => {
    fork(server.instance, 'increaseFunc', [], { respond: true });
  }).toThrowError(/a temporary string/);
});

test('fork with args', async () => {
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
  await client0.bootstrap();
  await server.instance.increase();
  expect(client0.instance.count).toBe(2);
  expect(server.instance.count).toBe(2);

  await server.instance.increase();
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(3);

  await fork(server.instance, 'add', [1]);
  expect(server.instance.count).toBe(3);
  expect(client0.instance.count).toBe(4);
});

test('fork with args with destroy on Client', async () => {
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

  expect(server.instance.count).toBe(0);

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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(0);

  client0.destroy();
  await server.instance.increase();

  expect(server.instance.count).toBe(1);
  expect(client0.instance.count).toBe(0);
});

test('fork with args with destroy on Server', async () => {
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

  expect(server.instance.count).toBe(0);

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
  await client0.bootstrap();
  expect(client0.instance.count).toBe(0);

  server.destroy();
  await server.instance.increase();
  // jest can send message to client after server destroyed
  expect(server.instance.count).toBe(1);
  expect(client0.instance.count).toBe(1);

  await expect(
    Promise.race([
      client0.instance.increase(),
      new Promise((resolve) => {
        setTimeout(() => resolve('timeout'), 100);
      }),
    ])
  ).resolves.toBe('timeout');
});
