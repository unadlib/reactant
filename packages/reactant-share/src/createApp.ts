/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App, createApp as createReactantApp, Renderer } from 'reactant';
import { createTransport } from 'data-transport';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { Config, ISharedAppOptions, Port, Transports } from './interfaces';
import { handleServer } from './server';
import { handleClient } from './client';
import { createBroadcastTransport } from './createTransport';
import { isClientName, SharedAppOptions } from './constants';
import { PortDetector } from './portDetector';
import { useLock } from './lock';

const createBaseApp = <T, S extends any[], R extends Renderer<S>>({
  share,
  ...options
}: Config<T, S, R>): Promise<App<T, S, R>> => {
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
      provide: SharedAppOptions,
      useValue: share as ISharedAppOptions,
    },
    PortDetector
  );

  return new Promise(async (resolve) => {
    let app: App<T, S, R>;
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
    app = createReactantApp(options);
    if (share.port) {
      if (isServer) {
        if (!serverTransport) {
          throw new Error(`'transports.server' does not exist.`);
        }
        disposeServer = handleServer({
          app,
          transport: serverTransport,
          enablePatchesChecker: share.enablePatchesChecker,
        });
      } else {
        if (!clientTransport) {
          throw new Error(`'transports.client' does not exist.`);
        }
        disposeClient = handleClient({
          app,
          transport: clientTransport,
          enablePatchesFilter: share.enablePatchesFilter,
        });
      }
    }
    resolve(app);
  });
};

const createSharedTabApp = async <T, S extends any[], R extends Renderer<S>>(
  options: Config<T, S, R>
) => {
  if (__DEV__ && options.share.forcedSyncClient === false) {
    console.warn(`'forcedSyncClient' must be enabled in 'SharedTab' mode`);
  }
  options.share.forcedSyncClient = true;
  /**
   * Performance issue with broadcast-channel repo in Safari.
   */
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    options.share.transports = {};
    options.share.port = undefined;
    options.share.type = 'Base';
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
  let app: App<T, S, R>;
  app = await Promise.race([
    new Promise<App<T, S, R>>((resolve) => {
      useLock(`reactant-share-app-lock:${options.share.name}`, async () => {
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
      });
    }),
    new Promise<App<T, S, R>>(async (resolve) => {
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
 * import { createSharedApp, injectable, state, action, spawn, mockPairTransports } from 'reactant-share';
 *
 * @injectable({
 *   name: 'counter',
 * })
 * class Counter {
 *   @state
 *   count = 0;
 *
 *   @action
 *   increase() {
 *     this.count += 1;
 *   }
 * }
 *
 * (async () => {
 *   const transports = mockPairTransports();
 *
 *   const server = await createSharedApp({
 *     modules: [],
 *     main: Counter,
 *     render: () => {},
 *     share: {
 *       name: 'counter',
 *       type: 'Base',
 *       port: 'server',
 *       transports: {
 *         server: transports[0],
 *       },
 *     },
 *   });
 *
 *   const client = await createSharedApp({
 *     modules: [],
 *     main: Counter,
 *     render: () => {},
 *     share: {
 *       name: 'counter',
 *       type: 'Base',
 *       port: 'client',
 *       transports: {
 *         client: transports[1],
 *       },
 *     },
 *   });
 *
 *   await spawn(client.instance, 'increase', []);
 *
 *   expect(client.instance.count).toBe(1);
 *   expect(server.instance.count).toBe(1);
 *
 *   global.done();
 * })();
 * ```
 */
export const createSharedApp = async <
  T,
  S extends any[],
  R extends Renderer<S>
>(
  options: Config<T, S, R>
): Promise<App<T, S, R>> => {
  let app: App<T, S, R>;
  let transports: Transports;

  if (typeof options.share === 'undefined') {
    throw new Error(`'createSharedApp(options)' should be set 'share' option.`);
  }

  // Check to minimized patch.
  options.share.enablePatchesChecker ??= __DEV__;

  // force Sync for all client
  options.share.forcedSyncClient ??= true;

  switch (options.share.type) {
    case 'SharedWorker':
      try {
        transports = {
          server: options.share.transports?.server,
          client: options.share.transports?.client,
        };

        if (options.share.port === 'client' && options.share.worker) {
          transports.client ??= createTransport('SharedWorkerMain', {
            worker: options.share.worker as SharedWorker,
            prefix: `reactant-share:${options.share.name}`,
          });
        }

        if (options.share.port === 'server') {
          transports.server ??= createTransport('SharedWorkerInternal', {
            prefix: `reactant-share:${options.share.name}`,
          });
        } else if (options.share.port === 'client' && !transports.client) {
          if (typeof options.share.workerURL !== 'string') {
            throw new Error(
              `The value of 'options.share.workerURL' should be a string.`
            );
          }
          transports.client = createTransport('SharedWorkerMain', {
            worker: new SharedWorker(options.share.workerURL),
            prefix: `reactant-share:${options.share.name}`,
          });
        }
        options.share.transports = transports;
        app = await createBaseApp(options);
      } catch (e) {
        console.warn(e);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { port, workerURL, name, ...shareOptions } = options.share;
        app = await createSharedTabApp({
          ...options,
          share: {
            ...shareOptions,
            type: 'SharedTab',
            name,
            forcedSyncClient: true,
          },
        });
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
        `The value of 'options.share.type' be 'SharedTab', 'SharedWorker' or 'Base'.`
      );
  }
  const { bootstrap } = app;
  return {
    ...app,
    bootstrap: async (...args: S) => {
      const result = bootstrap(...args);
      const portDetector = app.container.get(PortDetector);
      if (portDetector.isClient) {
        await portDetector.syncFullStatePromise;
      }
      return result;
    },
  };
};
