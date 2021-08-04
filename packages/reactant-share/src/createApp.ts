/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App as BaseApp, createApp as createReactantApp } from 'reactant';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { Transport } from 'data-transport';
import { Config, App, Port } from './interfaces';
import { handleServer } from './server';
import { handleClient } from './client';
import {
  createBroadcastTransport,
  setClientTransport,
} from './createTransport';
import { preloadedStateActionName } from './constants';

const createBaseApp = <T>({
  name,
  transports = {},
  port,
  ...options
}: Config<T>): Promise<App<any>> => {
  options.modules?.push(LastAction, {
    provide: LastActionOptions,
    useValue: {
      stateKey: `lastAction-${name}`,
    } as ILastActionOptions,
  });
  return new Promise(async (resolve) => {
    let app: BaseApp<any>;
    let disposeServer: (() => void) | undefined;
    let disposeClient: (() => void) | undefined;
    let serverTransport: Transport<any, any> | undefined;
    let clientTransport: Transport<any, any> | undefined;
    const isServer = port === 'server';
    const transform = (changedPort: Port) => {
      if (changedPort === 'server') {
        serverTransport ??= transports.server ?? createBroadcastTransport(name);
        handleServer(app, serverTransport!, disposeClient);
      } else {
        clientTransport ??= transports.client ?? createBroadcastTransport(name);
        handleClient(app, clientTransport!, disposeServer);
      }
    };
    if (isServer) {
      serverTransport = transports.server ?? createBroadcastTransport(name);
      app = createReactantApp(options);
      disposeServer = handleServer(app, serverTransport);
      resolve({ ...app, transform });
    } else {
      clientTransport = transports.client ?? createBroadcastTransport(name);
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
  let app: App<any>;
  const server = await Promise.race([
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
    new Promise<void>((resolve) => setTimeout(resolve)),
  ]);
  app =
    server ??
    (await createBaseApp({
      ...options,
      port: 'client',
    }));
  return app;
};

export const createApp = async <T>({
  type,
  transports: originalTransports,
  ...options
}: Config<T> & {
  type?: 'Extension' | 'ShareWorker';
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
      // TODO: add ShareWorker default transport
      transports = {
        server: originalTransports?.server,
        client: originalTransports?.client,
      };
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
