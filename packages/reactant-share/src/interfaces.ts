import { Transport } from 'data-transport';
import { Config as BaseConfig, App as BaseApp } from 'reactant';

export type Port = 'server' | 'client';
export interface Config<T> extends BaseConfig<T> {
  /**
   *
   */
  name: string;
  /**
   *
   */
  transports?: {
    server?: Transport;
    client?: Transport;
  };
  /**
   *
   */
  port?: Port;
}

export interface App<T> extends BaseApp<T> {
  transform: (changedPort: Port) => void;
}

export type Callback = () => void | Promise<void>;

export type CallbackWithHook = () => void | (() => void);

export type PortApp = Partial<Record<Port, BaseApp<any>>>;
