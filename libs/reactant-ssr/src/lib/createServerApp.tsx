import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { createApp as createAppWithoutSSR } from 'reactant';
import { AppView } from './appView';
import { ServerConfig, ServerApp } from './interfaces';

/**
 * create a ServerApp for SSR
 */
export const createServerApp = (options: ServerConfig): ServerApp => {
  const { bootstrap, store, instance, container } = createAppWithoutSSR({
    ...options,
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
