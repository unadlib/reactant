import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { createApp as createAppWithoutSSR, Renderer } from 'reactant';
import { AppView } from './appView';
import { ServerConfig, ServerApp } from './interfaces';

/**
 * create a ServerApp for SSR
 */
export const createServerApp = <T, S extends any[], R extends Renderer<S>>(
  options: ServerConfig<T, S, R>
): ServerApp<T, S, R> => {
  const { bootstrap, store, instance, container } = createAppWithoutSSR({
    ...options,
    // TODO: fix types
    // @ts-ignore
    main: options.main ?? AppView,
    render: (element) => element,
  });
  const AppComponent = (appProps: AppProps) => {
    return bootstrap((Component: FunctionComponent<AppProps>) => (
      <Component {...appProps} />
    )) as JSX.Element;
  };
  return {
    store,
    instance,
    container,
    bootstrap: AppComponent,
  };
};
