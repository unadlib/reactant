import { Transport } from 'data-transport';
import { Config as BaseConfig } from 'reactant';

type Port = 'server' | 'client';
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
  port: Port;
  /**
   *
   */
  transform?: (callback: (port: Port) => void) => void;
}

export type Callback = () => void | Promise<void>;
