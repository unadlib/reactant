/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App as BaseApp, createApp as createReactantApp } from 'reactant';
import { createTransport } from 'data-transport';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { Config, App, Port } from './interfaces';
import { handleServer } from './server';
import { handleClient } from './client';
import {
  createBroadcastTransport,
  setClientTransport,
} from './createTransport';
import { isClientName, preloadedStateActionName } from './constants';

const createBaseApp = <T>({
  share,
  ...options
}: Config<T>): Promise<App<any>> => {
  options.devOptions ??= {};
  options.devOptions.enablePatches = true;
  options.modules?.push(LastAction, {
    provide: LastActionOptions,
    useValue: {
      stateKey: `lastAction-${share.name}`,
    } as ILastActionOptions,
  });
  console.log('----', share.port);
  return new Promise(async (resolve) => {
    let app: BaseApp<any>;
    let disposeServer: (() => void) | undefined;
    let disposeClient: (() => void) | undefined;
    const serverTransport = share.transports?.server;
    const clientTransport = share.transports?.client;
    const isServer = share.port === 'server';
    const transform = (changedPort: Port) => {
      if (changedPort === 'server') {
        if (!serverTransport) {
          throw new Error(`'transports.server' does not exist.`);
        }
        handleServer(app, serverTransport, disposeClient);
      } else {
        if (!clientTransport) {
          throw new Error(`'transports.client' does not exist.`);
        }
        handleClient(app, clientTransport, disposeServer);
      }
    };
    if (isServer) {
      if (!serverTransport) {
        throw new Error(`'transports.server' does not exist.`);
      }
      app = createReactantApp(options);
      disposeServer = handleServer(app, serverTransport);
      resolve({ ...app, transform });
    } else {
      if (!clientTransport) {
        throw new Error(`'transports.client' does not exist.`);
      }
      setClientTransport(clientTransport);
      clientTransport
        .emit(preloadedStateActionName)
        .then((preloadedState: any) => {
          app = createReactantApp({ ...options, preloadedState });
          disposeClient = handleClient(app, clientTransport!);
          resolve({ ...app, transform });
        });
    }
  });
};

const createSharedTabApp = async <T>(options: Config<T>) => {
  options.share.transports ??= {};
  options.share.transports.client ??= createBroadcastTransport(
    options.share.name
  );
  options.share.transports.server ??= createBroadcastTransport(
    options.share.name
  );
  let app: App<any>;
  app = await Promise.race([
    new Promise<App<any>>((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigator.locks.request(
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
            app.transform('server');
          }
          resolve(app);
          return new Promise(() => {
            //
          });
        }
      );
    }),
    new Promise<App<any>>(async (resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const isClient: boolean = await options.share.transports?.client?.emit(
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

export const createApp = async <T>(options: Config<T>) => {
  let app: App<any>;
  let transports = options.share.transports ?? {};
  switch (options.share.type) {
    case 'BrowserExtension':
      // TODO: add Extension default transport
      transports = {
        server: options.share.transports?.server,
        client: options.share.transports?.client,
      };
      app = await createBaseApp({
        ...options,
        share: {
          ...options.share,
          transports,
        },
      });
      break;
    case 'SharedWorker':
      transports = {
        server: options.share.transports?.server,
        client: options.share.transports?.client,
      };
      if (options.share.port === 'server') {
        transports.server ??= createTransport('SharedWorkerInternal', {});
      } else if (options.share.port === 'client' && !transports.client) {
        if (!(options.share.worker instanceof SharedWorker)) {
          throw new Error(``);
        }
        transports.client = createTransport('SharedWorkerMain', {
          worker: options.share.worker,
        });
      }
      app = await createBaseApp({
        ...options,
        share: {
          ...options.share,
          transports,
        },
      });
      break;
    case 'SharedTab':
      app = await createSharedTabApp(options);
      break;
    default:
      throw new Error(``);
  }
  return app;
};
