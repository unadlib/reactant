/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App, containerKey, createApp as createReactantApp } from 'reactant';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { createTransport, Transport } from 'data-transport';
import { BroadcastChannel } from 'broadcast-channel';
import { Config } from './interfaces';
import { getIsMain, setIsMain } from './tabChecker';

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

export const createApp = <T>({ name, ...options }: Config<T>) => {
  return new Promise(async (resolve) => {
    const broadcastChannel = new BroadcastChannel('broadcastChannel');
    const transport = createTransport('Base', {
      listener: (callback) => {
        broadcastChannel.onmessage = (data) => {
          callback(data);
        };
      },
      sender: (message) => broadcastChannel.postMessage(message),
      prefix: `reactant-shared-app:${name}`,
    });
    let app: App<any>;
    let disposeLastAction: (() => void) | undefined;
    const isMainTab = await Promise.race([
      new Promise<boolean>((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigator.locks.request(name, () => {
          resolve(true);
          if (getIsMain() === false) {
            // client becomes server
            const shareCallback = setIsMain(true);
            shareCallback();
            disposeLastAction?.();
            handleServer(app, transport);
          } else {
            //
          }
          return new Promise(() => {
            // Main JS container lock
          });
        });
      }),
      new Promise<boolean>(async (resolve) => {
        const result = await transport.emit('isClient');
        if (result) {
          resolve(false);
        }
      }),
    ]);

    const shareCallback = setIsMain(isMainTab);

    options.modules?.push(LastAction, {
      provide: LastActionOptions,
      useValue: {
        stateKey: `lastAction-${name}`,
      } as ILastActionOptions,
    });

    if (getIsMain()) {
      // server
      app = createReactantApp(options);
      shareCallback();
      handleServer(app, transport);
      resolve(app);
      return;
    }
    // client
    transport.emit('preloadedState').then((preloadedState: any) => {
      app = createReactantApp({ ...options, preloadedState });
      shareCallback();
      resolve(app);
    });
    disposeLastAction = transport.listen('lastAction', (lastAction: any) => {
      app?.store?.dispatch(lastAction);
    });
    // proxy function
    const proxy = ({
      module,
      method,
      args,
    }: {
      module: string;
      method: string;
      args: any[];
    }) => {
      if (!getIsMain()) {
        transport.emit('proxyFunction', { module, method, args });
      }
    };
  });
};
