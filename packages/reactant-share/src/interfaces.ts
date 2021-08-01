import { Transport } from 'data-transport';
import { Config as BaseConfig } from 'reactant';

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
}

export type Callback = () => void | Promise<void>;
