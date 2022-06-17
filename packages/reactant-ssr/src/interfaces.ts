import { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import { App, Config, Renderer } from 'reactant';

export interface ServerConfig<T, S extends any[], R extends Renderer<S>>
  extends Pick<
    Config<T, S, R>,
    Exclude<keyof Config<T, S, R>, 'render' | 'main'>
  > {
  main?: Config<T, S, R>['main'];
}

export interface ServerApp<T, S extends any[], R extends Renderer<S>>
  extends Pick<App<T, S, R>, Exclude<keyof App<T, S, R>, 'bootstrap'>> {
  bootstrap: FunctionComponent<AppProps>;
}
