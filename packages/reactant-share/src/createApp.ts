/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App, createApp as createReactantApp } from 'reactant';
import { createTransport } from 'data-transport';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { Config, Port, Transports } from './interfaces';
import { handleServer } from './server';
import { handleClient } from './client';
import { createBroadcastTransport } from './createTransport';
import { isClientName, preloadedStateActionName } from './constants';
import {
  IPortDetectorOptions,
  PortDetector,
  PortDetectorOptions,
} from './portDetector';

const createBaseApp = <T>({
  share,
  ...options
}: Config<T>): Promise<App<any>> => {
  options.modules ??= [];
  options.devOptions ??= {};
  options.devOptions.enablePatches = true;
  options.modules.push(
    LastAction,
    {
      provide: LastActionOptions,
      useValue: {
        stateKey: `lastAction-${share.name}`,
      } as ILastActionOptions,
    },
    {
      provide: PortDetectorOptions,
      useValue: {
        transports: share.transports,
      } as IPortDetectorOptions,
    },
    PortDetector
  );
  console.log('----', share.port);
  return new Promise(async (resolve) => {
    let app: App<any>;
    let disposeServer: (() => void) | undefined;
    let disposeClient: (() => void) | undefined;
    const serverTransport = share.transports?.server;
    const clientTransport = share.transports?.client;
    const isServer = share.port === 'server';
    const { transform } = share;
    share.transform = (changedPort: Port) => {
      if (changedPort === 'server') {
        if (!serverTransport) {
          throw new Error(`'transports.server' does not exist.`);
        }
        handleServer({
          app,
          transport: serverTransport,
          disposeClient,
          enablePatchesChecker: share.enablePatchesChecker,
        });
      } else {
        if (!clientTransport) {
          throw new Error(`'transports.client' does not exist.`);
        }
        handleClient({
          app,
          transport: clientTransport,
          disposeServer,
          enablePatchesFilter: share.enablePatchesFilter,
        });
      }
      transform?.(changedPort);
    };
    if (isServer) {
      if (!serverTransport) {
        throw new Error(`'transports.server' does not exist.`);
      }
      app = createReactantApp(options);
      disposeServer = handleServer({
        app,
        transport: serverTransport,
        enablePatchesChecker: share.enablePatchesChecker,
      });
      resolve(app);
    } else {
      if (!clientTransport) {
        throw new Error(`'transports.client' does not exist.`);
      }
      clientTransport.emit(preloadedStateActionName).then((preloadedState) => {
        app = createReactantApp({ ...options, preloadedState });
        disposeClient = handleClient({
          app,
          transport: clientTransport,
          enablePatchesFilter: share.enablePatchesFilter,
        });
        resolve(app);
      });
    }
  });
};

const createSharedTabApp = async <T>(options: Config<T>) => {
  // TODO: use web lock polyfill
  if (!(navigator as any).locks) {
    options.share.transports ??= {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    options.share.transports.server = { emit() {}, listen() {} };
    options.share.port = 'server';
    const app = createBaseApp(options);
    return app;
  }
  options.share.transports ??= {};
  options.share.transports.client ??= createBroadcastTransport(
    options.share.name
  );
  options.share.transports.server ??= createBroadcastTransport(
    options.share.name
  );
  if (options.share.port) {
    const app = await createBaseApp(options);
    return app;
  }
  let app: App<any>;
  app = await Promise.race([
    new Promise<App<any>>((resolve) => {
      (navigator as any).locks.request(
        `reactant-share-app-lock:${options.share.name}`,
        async () => {
          if (!app) {
            options.share.port = 'server';
            app = await createBaseApp(options);
          } else {
            options.share.transform?.('server');
          }
          resolve(app);
          return new Promise(() => {
            //
          });
        }
      );
    }),
    new Promise<App<any>>(async (resolve) => {
      const isClient = await options.share.transports?.client?.emit(
        isClientName
      );
      if (isClient) {
        options.share.port = 'client';
        const app = await createBaseApp(options);
        resolve(app);
      }
    }),
  ]);
  return app;
};

/**
 * ## Description
 *
 * You can create an shared app with `createSharedApp()` passing app configuration,
 * which will asynchronously return an object including `instance`, `store`,
 * and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).
 *
 * ## Example
 *
 * ```ts
  import { createSharedApp, injectable, state, action, proxify } from 'reactant-share';
  import { mockPairPorts, createTransport } from 'data-transport';

  @injectable()
  class Counter {
    name = 'counter';

    @state
    count = 0;

    @action
    _increase() {
      this.count += 1;
    }

    @proxify
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
 * ```
 */
export const createSharedApp = async <T>(options: Config<T>) => {
  let app: App<any>;
  let transports: Transports;
  switch (options.share.type) {
    case 'BrowserExtension':
      transports = {
        server: options.share.transports?.server,
        client: options.share.transports?.client,
      };
      if (options.share.port === 'server') {
        transports.server ??= createTransport('BrowserExtensionsMain', {});
      } else if (options.share.port === 'client') {
        transports.client ??= createTransport('BrowserExtensionsClient', {});
      }
      options.share.transports = transports;
      app = await createBaseApp(options);
      break;
    case 'SharedWorker':
      try {
        transports = {
          server: options.share.transports?.server,
          client: options.share.transports?.client,
        };
        if (options.share.port === 'server') {
          transports.server ??= createTransport('SharedWorkerInternal', {});
        } else if (options.share.port === 'client' && !transports.client) {
          if (typeof options.share.sharedWorkerURL !== 'string') {
            throw new Error(
              `The value of 'options.share.sharedWorkerURL' should be a string.`
            );
          }
          transports.client = createTransport('SharedWorkerMain', {
            worker: new SharedWorker(options.share.sharedWorkerURL),
          });
        }
        options.share.transports = transports;
        app = await createBaseApp(options);
      } catch (e) {
        app = await createSharedTabApp(options);
      }
      break;
    case 'SharedTab':
      app = await createSharedTabApp(options);
      break;
    case 'Base':
      app = await createBaseApp(options);
      break;
    default:
      throw new Error(
        `The value of 'options.share.type' be 'SharedTab', 'SharedWorker', 'BrowserExtension' or 'Base'`
      );
  }
  return app;
};
