/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act } from 'react-dom/test-utils';

import {
  ViewModule,
  createApp,
  injectable,
  inject,
  optional,
  useConnector,
  action,
  computed,
  autobind,
  state,
} from 'reactant';
import { render, unmountComponentAtNode } from 'reactant-web';
import { Storage, StorageOptions, IStorageOptions } from '..';

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
  test('base persistence module', async () => {
    @injectable()
    class Bar {
      constructor(public storage: Storage) {
        this.storage.setStorage(this, {
          whitelist: ['test'],
        });
      }

      name = 'bar';

      @state
      test = 'test';
    }

    @injectable()
    class Count {
      constructor(public storage: Storage) {
        this.storage.setStorage(this, {
          blacklist: ['num'],
        });
      }

      name = 'count';

      @state
      num = 0;

      @state
      num1 = 0;

      @autobind
      @action
      increase() {
        this.num += 1;
      }
    }

    @injectable()
    class DashboardView extends ViewModule {
      constructor(public count: Count) {
        super();
      }

      @computed((that: DashboardView) => [that.count.num])
      get num() {
        return this.count.num + 1;
      }

      getData = () => ({
        num: this.num,
        increase: this.count.increase,
      });

      component() {
        const data = useConnector(this.getData);
        return (
          <div onClick={data.increase} id="increase">
            {data.num}
          </div>
        );
      }
    }

    @injectable()
    class AppView extends ViewModule {
      constructor(public bar: Bar, public dashboardView: DashboardView) {
        super();
      }

      component() {
        return <this.dashboardView.component />;
      }
    }
    const storage = {
      data: {} as Record<string, any>,
      getItem(key: string): Promise<string> {
        return new Promise((resolve) => {
          resolve(this.data[key]);
        });
      },
      setItem(key: string, item: string): Promise<void> {
        return new Promise((resolve) => {
          this.data[key] = item;
          resolve();
        });
      },
      removeItem(key: string): Promise<void> {
        return new Promise((resolve) => {
          delete this.data[key];
          resolve();
        });
      },
    };
    const app = createApp({
      modules: [
        {
          provide: StorageOptions,
          useValue: {
            storage,
          } as IStorageOptions,
        },
      ],
      main: AppView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    await new Promise((resolve) => {
      setTimeout(resolve);
    });
    expect(container.querySelector('#increase')?.textContent).toBe('1');
    act(() => {
      container
        .querySelector('#increase')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('#increase')?.textContent).toBe('2');
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    expect(app.store?.getState()).toEqual({
      bar: { test: 'test', _persist: { version: -1, rehydrated: true } },
      count: { num: 1, num1: 0, _persist: { version: -1, rehydrated: true } },
      _persist: { version: -1, rehydrated: true },
    });
    expect(storage.data).toEqual({
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:bar':
        '{"test":"\\"test\\"","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:count':
        '{"num1":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });
  });
});
