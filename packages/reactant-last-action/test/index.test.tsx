/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
  inject,
  subscribe,
  watch,
} from 'reactant';
import { render, unmountComponentAtNode } from 'reactant-web';
import { ILastActionOptions, LastAction, LastActionOptions } from '..';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

describe('base API', () => {
  test('base lastAction module', async () => {
    @injectable({
      name: 'counter',
    })
    class Counter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }
    }

    @injectable()
    class AppView extends ViewModule {
      constructor(
        @inject('counter') public counter: Counter,
        public lastActionService: LastAction
      ) {
        super();
      }

      get lastAction() {
        return this.lastActionService.action;
      }

      component() {
        const count = useConnector(() => this.counter.count);
        return (
          <button type="button" onClick={() => this.counter.increase()}>
            {count}
          </button>
        );
      }
    }

    const app = createApp({
      main: AppView,
      modules: [{ provide: 'counter', useClass: Counter }, LastAction],
      render,
    });

    act(() => {
      app.bootstrap(container);
    });
    expect(app.store?.getState().lastAction._sequence).toBe(1);
    expect(
      /^@@redux\/INIT/.test(app.store?.getState().lastAction.type)
    ).toBeTruthy();
    expect(container.textContent).toBe('0');

    act(() => {
      container
        .querySelector('[type="button"]')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const expectedValue = {
      _reactant: 'REACTANT_ACTION',
      method: 'increase',
      type: 'counter',
      params: [],
      _sequence: 2,
    };

    expect(app.store?.getState().lastAction).toEqual(expectedValue);
    expect(app.instance.lastAction).toEqual(expectedValue);
  });

  test('use LastActionOptions', async () => {
    const subscribeFn = jest.fn();
    const watchFn = jest.fn();

    @injectable({
      name: 'counter',
    })
    class Counter {
      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @action
      decrease(num: number) {
        this.count -= num;
      }
    }

    @injectable()
    class AppView extends ViewModule {
      constructor(
        @inject('counter') public counter: Counter,
        public lastAction: LastAction
      ) {
        super();
        subscribe(this, () => {
          subscribeFn(this.lastAction.action);
        });
        watch(
          this,
          () => this.lastAction.action,
          (lastAction, oldAction) => {
            watchFn(lastAction, oldAction);
          }
        );
      }

      component() {
        const count = useConnector(() => this.counter.count);
        return (
          <>
            <button
              type="button"
              id="increase"
              onClick={() => this.counter.increase()}
            >
              {count}
            </button>
            <button
              type="button"
              id="decrease"
              onClick={() => this.counter.decrease(1)}
            >
              {count}
            </button>
          </>
        );
      }
    }

    const stateKey = '_lastAction';

    const app = createApp({
      main: AppView,
      modules: [
        { provide: 'counter', useClass: Counter },
        LastAction,
        {
          provide: LastActionOptions,
          useValue: {
            stateKey,
          } as ILastActionOptions,
        },
      ],
      render,
    });

    act(() => {
      app.bootstrap(container);
    });
    expect(app.instance.lastAction.sequence).toBe(1);

    expect(app.store?.getState()[stateKey]._sequence).toBe(1);
    expect(
      /^@@redux\/INIT/.test(app.store?.getState()[stateKey].type)
    ).toBeTruthy();

    expect(container.textContent).toBe('00');

    expect(watchFn.mock.calls.length).toBe(0);
    expect(subscribeFn.mock.calls.length).toBe(0);

    act(() => {
      container
        .querySelector('[id="increase"]')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toBe('11');

    const expectedValue = {
      _reactant: 'REACTANT_ACTION',
      method: 'increase',
      type: 'counter',
      params: [],
      _sequence: 2,
    };

    expect(app.store?.getState()[stateKey]).toEqual(expectedValue);
    expect(app.instance.lastAction.action).toEqual(expectedValue);

    expect(watchFn.mock.calls).toEqual([[expectedValue, null]]);
    expect(subscribeFn.mock.calls).toEqual([[expectedValue]]);

    act(() => {
      container
        .querySelector('[id="decrease"]')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toBe('00');

    const expectedValue1 = {
      _reactant: 'REACTANT_ACTION',
      method: 'decrease',
      type: 'counter',
      params: [1],
      _sequence: 3,
    };

    expect(app.store?.getState()[stateKey]).toEqual(expectedValue1);
    expect(app.instance.lastAction.action).toEqual(expectedValue1);

    expect(watchFn.mock.calls).toEqual([
      [expectedValue, null],
      [expectedValue1, expectedValue],
    ]);
    expect(subscribeFn.mock.calls).toEqual([[expectedValue], [expectedValue1]]);

    expect(app.instance.lastAction.sequence).toBe(3);
    app.instance.lastAction.sequence = 10;
    expect(app.instance.lastAction.sequence).toBe(10);
  });
});
