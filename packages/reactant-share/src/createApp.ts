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
import { setIsServer } from './serverChecker';
import {
  createBroadcastTransport,
  setClientTransport,
} from './createTransport';

const handleServer = (app: App<any>, transport: Transport) => {
  const container = app.instance[containerKey];
  transport.listen('isClient', () => true);
  transport.listen('preloadedState', () => app.store?.getState());
  transport.listen(
    'proxyFunction',
    async (options: { module: string; method: string; args: any[] }) => {
      const module = container.get(options.module);
      const method = module[options.method];
      const result = await method.apply(module, options.args);
      return result;
    }
  );
  app.store?.subscribe(() => {
    const { lastAction }: LastAction = container.get(LastAction);
    if (lastAction) {
      transport.emit({ name: 'lastAction', respond: false }, lastAction);
    }
  });
};

export const createApp = <T>({
  name,
  transports = {},
  ...options
}: Config<T>) => {
  options.modules?.push(LastAction, {
    provide: LastActionOptions,
    useValue: {
      stateKey: `lastAction-${name}`,
    } as ILastActionOptions,
  });
  return new Promise(async (resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigator.locks.request(name, { ifAvailable: true }, (lock: any) => {
      let app: App<any>;
      let disposeLastAction: (() => void) | undefined;
      if (lock) {
        const serverTransport =
          transports.server ?? createBroadcastTransport(name);
        app = createReactantApp(options);
        const shareCallback = setIsServer(true);
        shareCallback();
        handleServer(app, serverTransport);
        resolve(app);
      } else {
        // client
        const clientTransport =
          transports.client ?? createBroadcastTransport(name);
        setClientTransport(clientTransport);
        clientTransport.emit('preloadedState').then((preloadedState: any) => {
          app = createReactantApp({ ...options, preloadedState });
          resolve(app);
        });
        disposeLastAction = clientTransport.listen(
          'lastAction',
          (lastAction: any) => {
            app?.store?.dispatch(lastAction);
          }
        );
      }
      return new Promise(() => {
        // lock
      });
    });
  });
};
