import React from 'react';
import { render } from 'reactant-web';
import { ViewModule, createApp, injectable, inject, optional } from '../..';

describe('base API', () => {
  test('DI', () => {
    class App extends ViewModule {
      name = 'app';

      component() {
        return <></>;
      }
    }
    const app = createApp({
      main: App,
      render,
    });
    expect(app.instance.name).toEqual('app');
  });
});
