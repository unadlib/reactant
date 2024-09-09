import React from 'react';
import type { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { createApp as createBaseApp } from 'reactant';
import type { Config, Renderer } from 'reactant';
import { AppView } from './appView';
import type { ServerConfig, ServerApp } from './interfaces';

/**
 * create a ServerApp for SSR
 */
export const createServerApp = <T, S extends any[], R extends Renderer<S>>(
  options: ServerConfig<T, S, R>
): ServerApp<T, S, R> => {
  const { bootstrap, ...rest } = createBaseApp({
    ...options,
    main: options.main ?? (AppView as Config<T, S, R>['main']),
    render: (element) => element,
  });
  const AppComponent = (appProps: AppProps) => {
    return (bootstrap as (Component: FunctionComponent<any>) => JSX.Element)(
      (Component: FunctionComponent<AppProps>) => <Component {...appProps} />
    ) as JSX.Element;
  };
  return {
    bootstrap: AppComponent,
    ...rest,
  };
};
