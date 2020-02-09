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
  const AppView: FC<{ a: string }> = ({ a }) => <span>{a}</span>;

  class Foo {
    s = '1';
  }

  class App extends View<{ a: string }> {
    constructor(public foo: Foo) {
      super();
    }

    get props() {
      return {
        a: this.foo.s,
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
  expect(container.querySelector('span')?.innerHTML).toBe('1');
});
