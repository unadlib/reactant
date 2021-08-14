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
import { Config, Port, Transform, Transports } from './interfaces';
import { handleServer } from './server';
import { handleClient } from './client';
import { createBroadcastTransport } from './createTransport';
import { isClientName, preloadedStateActionName } from './constants';
import {
  IPortDetectorOptions,
  PortDetector,
  PortDetectorOptions,
} from './port';

let transform: Transform;

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
    transform = (changedPort: Port) => {
      if (changedPort === 'server') {
        if (!serverTransport) {
          throw new Error(`'transports.server' does not exist.`);
        }
        handleServer({
          app,
          transport: serverTransport,
          disposeClient,
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
    };
    if (isServer) {
      if (!serverTransport) {
        throw new Error(`'transports.server' does not exist.`);
      }
      app = createReactantApp(options);
      disposeServer = handleServer({
        app,
        transport: serverTransport,
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
    const app = createReactantApp(options);
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
            app = await createBaseApp({
              ...options,
              share: {
                ...options.share,
                port: 'server',
              },
            });
          } else {
            transform?.('server');
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
        const app = await createBaseApp({
          ...options,
          share: {
            ...options.share,
            port: 'client',
          },
        });
        resolve(app);
      }
    }),
  ]);
  return app;
};

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
      app = await createBaseApp({
        ...options,
        share: {
          ...options.share,
          transports,
        },
      });
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
        app = await createBaseApp({
          ...options,
          share: {
            ...options.share,
            transports,
          },
        });
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
