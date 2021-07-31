/* eslint-disable no-shadow */
/* eslint-disable no-async-promise-executor */
import { App, containerKey, createApp as createReactantApp } from 'reactant';
import {
  LastAction,
  LastActionOptions,
  ILastActionOptions,
} from 'reactant-last-action';
import { createTransport } from 'data-transport';
import { BroadcastChannel } from 'broadcast-channel';
import { Config } from './interfaces';

export function createApp<T>({ name, ...options }: Config<T>) {
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

    const isMain = await Promise.race([
      new Promise<boolean>((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigator.locks.request(name, (lock) => {
          if (lock) resolve(true);
        });
      }),
      new Promise<boolean>(async (resolve) => {
        const result = await transport.emit('client');
        if (result) {
          resolve(false);
        }
      }),
    ]);

    options.modules?.push(LastAction, {
      provide: LastActionOptions,
      useValue: {
        stateKey: `lastAction-${name}`,
      } as ILastActionOptions,
    });

    let app: App<any>;

    if (isMain) {
      // main page
      app = createReactantApp(options);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const container = app.instance[containerKey];
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
      resolve(app);
      return;
    }

    // other tab
    // remove subscriptions

    transport.emit('preloadedState').then((preloadedState: any) => {
      app = createReactantApp({ ...options, preloadedState });
      resolve(app);
    });
    transport.listen('lastAction', (lastAction: any) => {
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
    }) => transport.emit('proxyFunction', { module, method, args });
  });
}
