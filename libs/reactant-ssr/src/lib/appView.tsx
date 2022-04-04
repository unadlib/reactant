import React from 'react';
import type { AppProps } from 'next/app';
import { ViewModule } from 'reactant';

/**
 * AppView for SSR entry point
 */
export class AppView extends ViewModule {
  component({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
  }
}
