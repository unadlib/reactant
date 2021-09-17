/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
import { AppProps } from 'next/app';
import { PluginModule } from 'reactant';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';
import { createServerApp, AppView } from '..';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

test('base', () => {
  const app = createServerApp({
    modules: [
      class extends PluginModule {
        provider = (props: PropsWithChildren<any>) => {
          return <div>{props.children}</div>;
        };
      },
    ],
  });

  const Component: FunctionComponent<{ name: string }> = ({ name }) => (
    <p>hello, {name}</p>
  );

  const AppComponent = app.bootstrap;

  act(() => {
    render(
      <AppComponent
        pageProps={{ name: 'reactant' }}
        Component={Component as FunctionComponent}
        router={{} as any}
      />,
      container
    );
  });

  expect(container.innerHTML).toBe('<div><p>hello, reactant</p></div>');
});

test('base with custom AppView', () => {
  const app = createServerApp({
    modules: [
      class extends PluginModule {
        provider = (props: PropsWithChildren<any>) => {
          return <div>{props.children}</div>;
        };
      },
    ],
    main: class extends AppView {
      component({ Component, pageProps }: AppProps) {
        return (
          <span>
            <Component {...pageProps} />
          </span>
        );
      }
    },
  });

  const Component: FunctionComponent<{ name: string }> = ({ name }) => (
    <p>hello, {name}</p>
  );

  const AppComponent = app.bootstrap;

  act(() => {
    render(
      <AppComponent
        pageProps={{ name: 'reactant' }}
        Component={Component as FunctionComponent}
        router={{} as any}
      />,
      container
    );
  });

  expect(container.innerHTML).toBe(
    '<div><span><p>hello, reactant</p></span></div>'
  );
});
