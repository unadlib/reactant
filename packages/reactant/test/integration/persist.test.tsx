/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  render,
  unmountComponentAtNode,
  Switch,
  Route,
  MemoryRouter,
  Link,
} from 'reactant-web';
import { Storgage, StorgageOptions } from 'reactant-storage';
import {
  ViewModule,
  createApp,
  injectable,
  inject,
  optional,
  useConnector,
  action,
  createSelector,
  autobind,
} from '../..';

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
  test('base persistence module', () => {
    @injectable()
    class Bar {
      name = 'bar';

      state = {
        test: 'test',
      };
    }

    @injectable()
    class Count {
      name = 'count';

      state = {
        num: 0,
      };

      @autobind
      @action
      increase() {
        this.state.num += 1;
      }
    }

    @injectable()
    class DashboardView extends ViewModule {
      constructor(public count: Count) {
        super();
      }

      getSum = createSelector(
        () => this.count.state.num,
        num => num + 1
      );

      getData = () => ({
        num: this.getSum(),
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
      constructor(
        public bar: Bar,
        public dashboardView: DashboardView,
        public storgage: Storgage
      ) {
        super();
      }

      component() {
        return <this.dashboardView.component />;
      }
    }
    const storage = {
      data: {},
      getItem(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
          // @ts-ignore
          resolve(this.data[key]);
        });
      },
      setItem(key: string, item: string): Promise<void> {
        return new Promise((resolve, reject) => {
          // @ts-ignore
          this.data[key] = item;
          resolve();
        });
      },
      removeItem(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
          // @ts-ignore
          delete this.data[key];
          resolve();
        });
      }
    };
    const app = createApp({
      modules: [
        {
          provide: StorgageOptions,
          useValue: {
            storage,
          },
        },
      ],
      main: AppView,
      render,
    });
    act(() => {
      app.bootstrap(container);
    });
    // todo
    // console.log(Object.keys(localStorage), app.store?.getState());
    // console.log(container.innerHTML)
    // expect(container.querySelector('#increase')?.textContent).toBe('1');
    // act(() => {
    //   container
    //     .querySelector('#increase')!
    //     .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // });
    // expect(container.querySelector('#increase')?.textContent).toBe('2');
  });
});
