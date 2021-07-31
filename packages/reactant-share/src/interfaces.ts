import { Config as BaseConfig } from 'reactant';

export interface Config<T> extends BaseConfig<T> {
  /**
   *
   */
  name: string;
}
