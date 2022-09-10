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
  computed,
  autobind,
  state,
  subscribe,
} from 'reactant';
import { render, unmountComponentAtNode } from 'reactant-web';
import { Storage, StorageOptions, IStorageOptions } from '..';

class MemoryStorage {
  constructor(public data: Record<string, any> = {}) {}

  getItem(key: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.data[key]);
    });
  }

  setItem(key: string, item: string) {
    return new Promise((resolve) => {
      this.data[key] = item;
      resolve(undefined);
    });
  }

  removeItem(key: string) {
    return new Promise((resolve) => {
      delete this.data[key];
      resolve(undefined);
    });
  }
}

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
    @injectable({
      name: 'bar',
    })
    class Bar {
      arrRehydrated: boolean[] = [];

      constructor(public storage: Storage) {
        this.storage.setStorage(this, {
          whitelist: ['test'],
        });
        subscribe(this, () => {
          const rehydrated = this.storage.getRehydrated(this);
          this.arrRehydrated.push(rehydrated);
        });
      }

      @state
      test = 'test';
    }

    @injectable({
      name: 'count',
    })
    class Count {
      constructor(public storage: Storage) {
        this.storage.setStorage(this, {
          blacklist: ['num'],
        });
      }

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

    const storage = new MemoryStorage();
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
    // just wait for async rehydration
    expect(
      app.instance.bar.arrRehydrated.filter((i) => i === false).length
    ).toBe(1);
    expect(app.instance.bar.arrRehydrated.slice(-1)[0]).toBe(true);
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

  test('base persistence module without any state', async () => {
    const storage = new MemoryStorage();
    @injectable({
      name: 'AppView',
    })
    class AppView extends ViewModule {
      constructor(public storage: Storage) {
        super();
        this.storage.setStorage(this, {});
      }

      component() {
        return null;
      }
    }

    expect(() => {
      createApp({
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
    }).toThrow(
      `Module 'AppView' is invalid for using 'setStorage', The current module does not have any global state that is decorated with '@state'.`
    );
  });

  test('base persistence module with non-string name', async () => {
    const storage = new MemoryStorage();

    @injectable({
      name: Symbol('') as any,
    })
    class AppView extends ViewModule {
      constructor(public storage: Storage) {
        super();
        this.storage.setStorage(this, {
          whitelist: ['count'],
        });
      }

      @state
      count = 0;

      component() {
        return null;
      }
    }

    expect(() => {
      createApp({
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
    }).toThrow(
      `Module 'AppView' is invalid for using 'setStorage', The parameter 'options.name' of the decorator '@injectable(options)' that decorates the 'AppView' module must be specified as a string.`
    );
  });

  test('base persistence module without setting name', async () => {
    const storage = new MemoryStorage();
    @injectable()
    class AppView extends ViewModule {
      constructor(public storage: Storage) {
        super();
        this.storage.setStorage(this, {
          whitelist: ['count'],
        });
      }

      @state
      count = 0;

      component() {
        return null;
      }
    }

    expect(() => {
      createApp({
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
    }).toThrow(
      `Module 'AppView' is invalid for using 'setStorage', The parameter 'options.name' of the decorator '@injectable(options)' that decorates the 'AppView' module must be specified as a string.`
    );
  });

  test('base persistence all module without setting name', async () => {
    const storage = new MemoryStorage();
    @injectable()
    class AppView extends ViewModule {
      constructor() {
        super();
      }

      @state
      count = 0;

      component() {
        return null;
      }
    }

    const spy = jest.spyOn(console, 'warn').mockImplementation();

    createApp({
      modules: [
        Storage,
        {
          provide: StorageOptions,
          useValue: {
            storage,
            blacklist: [],
          } as IStorageOptions,
        },
      ],
      main: AppView,
      render,
    });
    expect(spy.mock.calls.slice(-1)[0][0]).toMatch(
      /For state persistence, The '@injectable\({ name }\)' in the @@reactant\/AppView\/.+ module has not been set yet\./
    );
  });

  test('base persistence module with onRehydrated', async () => {
    @injectable({
      name: 'bar',
    })
    class Bar {
      promiseRehydrated = new Promise((resolve) => {
        this.storage.onRehydrated(() => {
          resolve(null);
        });
      });

      constructor(public storage: Storage) {
        this.storage.setStorage(this, {
          whitelist: ['test'],
        });
      }

      @state
      test = 'test';
    }

    @injectable({
      name: 'count',
    })
    class Count {
      constructor(public storage: Storage) {
        this.storage.setStorage(this, {
          blacklist: ['num'],
        });
      }

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

    class AsyncMemoryStorage extends MemoryStorage {
      getItem(key: string): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.data[key]);
          }, 1000);
        });
      }
    }

    const storage = new AsyncMemoryStorage();
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
    expect(container.querySelector('#increase')?.textContent).toBeUndefined();
    expect(app.instance.bar.storage.rehydrated).toBe(false);
    await app.instance.bar.promiseRehydrated;
    expect(container.querySelector('#increase')?.textContent).toBe('1');
    expect(app.instance.bar.storage.rehydrated).toBe(true);
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
