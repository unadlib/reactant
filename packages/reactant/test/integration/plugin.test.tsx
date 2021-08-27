/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { FC, PropsWithChildren } from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
import { act } from 'react-dom/test-utils';
import { ViewModule, createApp, injectable, PluginModule, state } from '../..';

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
  test('providers', () => {
    const testing = (withoutState: boolean) => {
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
        @state
        field = null;

        component() {
          return <i>foo</i>;
        }
      }

      @injectable()
      class FooViewWithoutState extends ViewModule {
        component() {
          return <i>foo</i>;
        }
      }

      const app = createApp<any>({
        modules: [BarPlugin, FooBarPlugin],
        main: withoutState ? FooViewWithoutState : FooView,
        render,
      });
      act(() => {
        app.bootstrap(container);
      });

      expect(container.innerHTML).toBe('<p><span><i>foo</i></span></p>');
    };
    testing(true);
    testing(false);
  });
});
