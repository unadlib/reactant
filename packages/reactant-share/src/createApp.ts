/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App, containerKey, createApp as createReactantApp } from 'reactant';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { Transport } from 'data-transport';
import { Config } from './interfaces';
import { setServer } from './server';
import {
  createBroadcastTransport,
  setClientTransport,
} from './createTransport';

const handleServer = (
  getApp: () => App<any>,
  transport: Transport,
  disposeClient?: () => void
) => {
  disposeClient?.();
  const app = getApp();
  setServer(app);
  const container = app.instance[containerKey];
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen('preloadedState', () => app.store?.getState())
  );
  disposeListeners.push(
    transport.listen(
      'proxyFunction',
      async (options: { module: string; method: string; args: any[] }) => {
        const module = container.get(options.module);
        const method = module[options.method];
        const result = await method.apply(module, options.args);
        return result;
      }
    )
  );
  disposeListeners.push(() => transport.dispose());
  disposeListeners.push(
    app.store?.subscribe(() => {
      const { lastAction }: LastAction = container.get(LastAction);
      if (lastAction) {
        transport.emit({ name: 'lastAction', respond: false }, lastAction);
      }
    })
  );
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};

const handleClient = (
  getApp: () => App<any>,
  transport: Transport,
  disposeServer?: () => void
) => {
  disposeServer?.();
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen('lastAction', (lastAction: any) => {
      getApp()?.store?.dispatch(lastAction);
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};

export const createApp = <T>({
  name,
  transports = {},
  port,
  transform,
  ...options
}: Config<T>) => {
  options.modules?.push(LastAction, {
    provide: LastActionOptions,
    useValue: {
      stateKey: `lastAction-${name}`,
    } as ILastActionOptions,
  });
  return new Promise(async (resolve) => {
    let app: App<any>;
    let disposeServer: (() => void) | undefined;
    let disposeClient: (() => void) | undefined;
    let serverTransport: Transport<any, any> | undefined;
    let clientTransport: Transport<any, any> | undefined;
    const isServer = port === 'server';
    if (isServer) {
      serverTransport = transports.server ?? createBroadcastTransport(name);
      app = createReactantApp(options);
      disposeServer = handleServer(() => app, serverTransport);
      resolve(app);
    } else {
      clientTransport = transports.client ?? createBroadcastTransport(name);
      setClientTransport(clientTransport);
      clientTransport.emit('preloadedState').then((preloadedState: any) => {
        app = createReactantApp({ ...options, preloadedState });
        resolve(app);
      });
      disposeClient = handleClient(() => app, clientTransport);
    }

    if (typeof transform === 'function') {
      transform((changedPort) => {
        if (changedPort === 'server') {
          serverTransport ??=
            transports.server ?? createBroadcastTransport(name);
          handleServer(() => app, serverTransport!, disposeClient);
        } else {
          clientTransport ??=
            transports.client ?? createBroadcastTransport(name);
          handleClient(() => app, clientTransport!, disposeServer);
        }
      });
    }
  });
};
