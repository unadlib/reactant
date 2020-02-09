import React, { FC } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { View, createApp } from '..';

let container: null | void | Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (typeof container === 'undefined' || container === null) {
    throw new Error(`invalid container`);
  }
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('`View` UI module', () => {
  interface AppProps {
    a: string;
  }

  const AppView: FC<AppProps> = ({ a }) => <span>{a}</span>;
  const s = '1';

  class Foo {
    a = s;
  }

  class App extends View<AppProps> {
    constructor(public foo: Foo) {
      super();
    }

    get props() {
      return {
        a: this.foo.a,
      };
    }

    get component() {
      return <AppView {...this.props} />;
    }
  }

  const app = createApp({
    modules: [Foo, App],
    main: App,
  });
  act(() => {
    if (typeof container === 'undefined' || container === null) {
      throw new Error(`invalid container`);
    }
    app.bootstrap(container);
  });
  if (typeof container === 'undefined' || container === null) {
    throw new Error(`invalid container`);
  }
  expect(container.querySelector('span')?.innerHTML).toBe(s);
});
