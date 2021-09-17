import { AppProps } from 'next/app';
import { App, Config } from 'reactant';

export interface ServerConfig
  extends Pick<Config<any>, Exclude<keyof Config<any>, 'render' | 'main'>> {
  main?: Config<any>['main'];
}

export interface ServerApp
  extends Pick<App<any>, Exclude<keyof App<any>, 'bootstrap'>> {
  bootstrap(appProps: AppProps): JSX.Element;
}
