/* eslint-disable no-shadow */
import React, { FC } from 'react';
import { unmountComponentAtNode, render } from 'reactant-web';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';
import {
  injectable,
  state,
  action,
  createApp,
  ViewModule,
  useConnector,
} from '..';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

describe('useConnector', () => {
  test('selector for object map values', () => {
    const renderFn = jest.fn();

    @injectable()
    class FooView extends ViewModule {
      @state
      key = null;

      @action
      setValue(value: any) {
        this.key = value;
      }

      component() {
        const { key } = useConnector(() => ({ key: this.key }));
        renderFn(key);
        return null;
      }
    }

    const app = createApp({
      modules: [],
      main: FooView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    const subscribeFn = jest.fn();
    const unsubscribe = app.store?.subscribe(subscribeFn);

    const list = [
      'str',
      'string',
      'string',
      true,
      false,
      1,
      2,
      Symbol(''),
      Symbol(''),
    ];
    const expectedRenderCallList: any[] = [null];

    for (let i = 0; i < list.length; i += 1) {
      if (list[i] !== list[i - 1]) {
        expectedRenderCallList.push(list[i]);
      }
      app.instance.setValue(list[i]);
      expect(subscribeFn.mock.calls.length).toBe(i + 1);
      expect(renderFn.mock.calls).toEqual(
        expectedRenderCallList.map((item) => [item])
      );
    }
  });
  test('selector for primitive and null value', () => {
    const renderFn = jest.fn();

    @injectable()
    class FooView extends ViewModule {
      @state
      key = null;

      @action
      setValue(value: any) {
        this.key = value;
      }

      component() {
        const value = useConnector(() => this.key);
        renderFn(value);
        return null;
      }
    }

    const app = createApp({
      modules: [],
      main: FooView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    const subscribeFn = jest.fn();
    app.store?.subscribe(subscribeFn);

    const list = ['str', 'string', true, false, 1, 2, Symbol(''), Symbol('')];

    for (let i = 0; i < list.length; i += 1) {
      app.instance.setValue(list[i]);
      expect(subscribeFn.mock.calls.length).toBe(i + 1);
      expect(renderFn.mock.calls).toEqual(
        [null, ...list]
          .map((item) => [item])
          .filter((_, index) => index < i + 2)
      );
    }
  });

  test('selector with custom shallowEqual', () => {
    const renderFn = jest.fn();
    const checkFn = jest.fn();

    @injectable()
    class FooView extends ViewModule {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @state
      key: string | null = null;

      @action
      setValue(value: string) {
        this.key = value;
      }

      component() {
        const value = useConnector(
          () => this.key,
          (newValue, oldValue) => {
            checkFn();
            return newValue === oldValue;
          }
        );
        renderFn(value);
        return null;
      }
    }

    const app = createApp({
      modules: [],
      main: {
        provide: 'FooView',
        useClass: FooView,
      },
      render,
    });
    expect(checkFn).toBeCalledTimes(0);
    expect(renderFn).toBeCalledTimes(0);
    act(() => {
      app.bootstrap(container);
    });
    expect(checkFn).toBeCalledTimes(1);
    expect(renderFn).toBeCalledTimes(1);
    act(() => {
      app.instance.setValue('str');
    });
    expect(checkFn).toBeCalledTimes(3);
    expect(renderFn).toBeCalledTimes(2);
    act(() => {
      app.instance.increase();
    });
    expect(checkFn).toBeCalledTimes(4);
    expect(renderFn).toBeCalledTimes(2);
  });

  test('selector with error custom shallowEqual', () => {
    const renderFn = jest.fn();
    const checkFn = jest.fn();

    @injectable()
    class FooView extends ViewModule {
      @state
      key: string | null = null;

      @action
      setValue(value: string) {
        this.key = value;
      }

      component() {
        const value = useConnector(
          () => this.key,
          (newValue, oldValue) => {
            checkFn();
            throw new Error(`some error`);
          }
        );
        renderFn(value);
        return null;
      }
    }

    const app = createApp({
      modules: [],
      main: {
        provide: 'FooView',
        useClass: FooView,
      },
      render,
    });
    expect(checkFn).toBeCalledTimes(0);
    expect(renderFn).toBeCalledTimes(0);
    expect(() => {
      app.bootstrap(container);
    }).toThrowError('some error');
  });

  test('selector without store', () => {
    const renderFn = jest.fn();

    @injectable()
    class FooView extends ViewModule {
      key = null;

      setValue(value: any) {
        this.key = value;
      }

      component() {
        const value = useConnector(() => this.key);
        renderFn(value);
        return null;
      }
    }

    const app = createApp({
      modules: [],
      main: FooView,
      render,
    });
    expect(() => {
      act(() => {
        app.bootstrap(container);
      });
    }).toThrow();
  });

  test('selector with container getter', () => {
    const renderFn = jest.fn();

    @injectable()
    class FooView extends ViewModule {
      @state
      key: string | null = null;

      @action
      setValue(value: string) {
        this.key = value;
      }

      component() {
        const value = useConnector((container) => container.get(FooView).key);
        renderFn(value);
        return null;
      }
    }

    const app = createApp({
      modules: [],
      main: FooView,
      render,
    });
    expect(renderFn).toBeCalledTimes(0);
    act(() => {
      app.bootstrap(container);
    });
    expect(renderFn).toBeCalledTimes(1);
    app.instance.setValue('str');
    expect(renderFn).toBeCalledTimes(2);
    expect(renderFn.mock.calls).toEqual([[null], ['str']]);
  });
});
