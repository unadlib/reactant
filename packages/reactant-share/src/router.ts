/* eslint-disable @typescript-eslint/no-empty-interface */
import { injectable, optional, storeKey, inject } from 'reactant';
import {
  BaseReactantRouter,
  RouterOptions,
  RouterState,
} from 'reactant-router';
import type { IRouterOptions as IBaseRouterOptions } from 'reactant-router';
import type { History } from 'history';
import {
  routerChangeName,
  SharedAppOptions,
  syncRouterName,
} from './constants';
import { proxify } from './decorators';
import { ISharedAppOptions } from './interfaces';
import { PortDetector } from './portDetector';

export type RouterChangeNameOptions =
  | {
      method: 'push';
      args: [string, Record<string, any>?];
    }
  | {
      method: 'replace';
      args: [string, Record<string, any>?];
    }
  | {
      method: 'go';
      args: [number];
    }
  | {
      method: 'goBack';
      args: [];
    }
  | {
      method: 'goForward';
      args: [];
    };

export interface IRouterOptions extends IBaseRouterOptions {
  //
}

/**
 * ReactantRouter
 * todo
 */
@injectable()
class ReactantRouter extends BaseReactantRouter {
  name = 'reactant:router';

  private _router?: RouterState;

  constructor(
    @optional(RouterOptions) protected options: IRouterOptions,
    protected portDetector: PortDetector,
    @inject(SharedAppOptions) protected sharedAppOptions: ISharedAppOptions
  ) {
    super(
      options,
      !(
        sharedAppOptions.type === 'SharedWorker' &&
        sharedAppOptions.port === 'server'
      )
    );

    this.portDetector.onServer((transport) => {
      return transport!.listen(
        syncRouterName,
        async () => this.router?.location
      );
    });
    this.portDetector.onClient((transport) => {
      transport!.emit(syncRouterName).then((location) => {
        this.history.replace(location);
      });
    });

    if (sharedAppOptions.type === 'SharedWorker') {
      this.portDetector.onServer((transport) => {
        const history: History = {
          push: async (path: string, state?: Record<string, any>) => {
            this._router = await transport.emit(routerChangeName, {
              method: 'push',
              args: [path, state],
            });
          },
          replace: async (path: string, state?: Record<string, any>) => {
            this._router = await transport.emit(routerChangeName, {
              method: 'replace',
              args: [path, state],
            });
          },
          go: async (n: number) => {
            this._router = await transport.emit(routerChangeName, {
              method: 'go',
              args: [n],
            });
          },
          goBack: async () => {
            this._router = await transport.emit(routerChangeName, {
              method: 'goBack',
              args: [],
            });
          },
          goForward: async () => {
            this._router = await transport.emit(routerChangeName, {
              method: 'goForward',
              args: [],
            });
          },
        } as any;
        this.history = history;
      });
      this.portDetector.onClient((transport) => {
        return transport.listen(routerChangeName, ({ method, args = [] }) => {
          const fn: Function = this.history[method];
          fn(...args);
          return this.router;
        });
      });
    }
  }

  get router() {
    return this._router ?? this[storeKey]?.getState()[this.stateKey];
  }

  @proxify
  async push(path: string, state?: Record<string, any>) {
    await this.history.push(path, state);
  }

  @proxify
  async replace(path: string, state?: Record<string, any>) {
    await this.history.replace(path, state);
  }

  @proxify
  async go(n: number) {
    await this.history.go(n);
  }

  @proxify
  async goBack() {
    await this.history.goBack();
  }

  @proxify
  async goForward() {
    await this.history.goForward();
  }
}

export { ReactantRouter as Router, RouterOptions };
