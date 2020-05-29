/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable class-methods-use-this */
import React, { FC, PropsWithChildren } from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
import { act } from 'react-dom/test-utils';
import { ViewModule, createApp, injectable, PluginModule } from '../..';
import { state } from '../../src';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

describe('plugin', () => {
  test('providers - without redux', () => {
    @injectable()
    class BarPlugin extends PluginModule {
      provider = ({ children }: PropsWithChildren<{}>) => <p>{children}</p>;
    }

    @injectable()
    class FooBarPlugin extends PluginModule {
      provider = ({ children }: PropsWithChildren<{}>) => (
        <span>{children}</span>
      );
    }

    @injectable()
    class FooViewWithoutState extends ViewModule {
      constructor() {
        super();
      }

      component() {
        return <i>foo</i>;
      }
    }

    const app = createApp({
      modules: [BarPlugin, FooBarPlugin],
      main: FooViewWithoutState,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });

    expect(container.innerHTML).toBe('<i>foo</i>');
  });

  test('providers - with redux', () => {
    @injectable()
    class BarPlugin extends PluginModule {
      provider = ({ children }: PropsWithChildren<{}>) => <p>{children}</p>;
    }

    @injectable()
    class FooBarPlugin extends PluginModule {
      provider = ({ children }: PropsWithChildren<{}>) => (
        <span>{children}</span>
      );
    }

    @injectable()
    class FooView extends ViewModule {
      constructor() {
        super();
      }

      @state
      field = null;

      component() {
        return <i>foo</i>;
      }
    }

    const app = createApp({
      modules: [BarPlugin, FooBarPlugin],
      main: FooView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });

    expect(container.innerHTML).toBe('<p><span><i>foo</i></span></p>');
  });
});
