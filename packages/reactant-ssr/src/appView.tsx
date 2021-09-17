import React from 'react';
import type { AppProps } from 'next/app';
import { ViewModule } from 'reactant';

export class AppView extends ViewModule {
  component({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
  }
}
