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
  name,
  transports = {},
  port,
  ...options
}: Config<T>): Promise<App<any>> => {
  options.devOptions ??= {};
  options.devOptions.enablePatches = true;
  options.modules?.push(LastAction, {
    provide: LastActionOptions,
    useValue: {
      stateKey: `lastAction-${name}`,
    } as ILastActionOptions,
  });
  console.log('----', port);
  return new Promise(async (resolve) => {
    let app: BaseApp<any>;
    let disposeServer: (() => void) | undefined;
    let disposeClient: (() => void) | undefined;
    const serverTransport = transports.server;
    const clientTransport = transports.client;
    const isServer = port === 'server';
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

const createWebApp = async <T>(options: Config<T>) => {
  options.transports ??= {};
  options.transports.client ??= createBroadcastTransport(options.name);
  options.transports.server ??= createBroadcastTransport(options.name);
  let app: App<any>;
  app = await Promise.race([
    new Promise<App<any>>((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigator.locks.request(
        `reactant-share-app-lock:${options.name}`,
        async () => {
          if (!app) {
            app = await createBaseApp({
              ...options,
              port: 'server',
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
      const isClient: boolean = await options.transports?.client?.emit(
        isClientName
      );
      if (isClient) {
        const app = await createBaseApp({
          ...options,
          port: 'client',
        });
        resolve(app);
      }
    }),
  ]);
  return app;
};

export const createApp = async <T>({
  type,
  transports: originalTransports,
  typeOptions = {},
  ...options
}: Config<T> & {
  type?: 'Extension' | 'ShareWorker';
  typeOptions?: {
    worker?: string;
  };
}) => {
  let app: App<any>;
  let transports = originalTransports;
  switch (type) {
    case 'Extension':
      // TODO: add Extension default transport
      transports = {
        server: originalTransports?.server,
        client: originalTransports?.client,
      };
      app = await createBaseApp({
        ...options,
        transports,
      });
      break;
    case 'ShareWorker':
      transports = {
        server: originalTransports?.server,
        client: originalTransports?.client,
      };
      if (options.port === 'server') {
        transports.server ??= createTransport('SharedWorkerInternal', {});
      } else if (options.port === 'client' && !transports.client) {
        if (typeof typeOptions.worker !== 'string') {
          throw new Error(``);
        }
        transports.client = createTransport('SharedWorkerMain', {
          worker: new SharedWorker(typeOptions.worker),
        });
      }
      app = await createBaseApp({
        ...options,
        transports,
      });
      break;
    default:
      app = await createWebApp(options);
  }
  return app;
};
