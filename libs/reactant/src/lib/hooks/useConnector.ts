/* eslint-disable no-console */
import { useSelector, useStore } from 'react-redux';
import { areShallowEqualWithObject } from 'reactant-module';
import { ShallowEqual } from '../interfaces';

/**
 * ## Description
 *
 * `useConnector` is a React Hooks, which you can use to inject any shared state and derived data that you want to render using.
 * And it supports both `useConnector(() => this.renderPropsValue)` and `useConnector(() => this.getMapStateToProps())` uses.
 *
 * ## Example
 *
 * ```tsx
 * @injectable()
 * class FooView extends ViewModule {
 *   @state
 *   key = 'str';
 *
 *   @action
 *   setValue(value: any) {
 *     this.key = value;
 *   }
 *
 *   component() {
 *     const { key } = useConnector(() => ({ key: this.key }));
 *     // or `const key = useConnector(() => this.key);`
 *     return <span>{key}</span>;
 *   }
 * }
 *
 * const container = document.createElement('div');
 * document.body.appendChild(container);
 *
 * act(() => {
 *   createApp({
 *     modules: [],
 *     main: FooView,
 *     render,
 *   }).bootstrap(container);
 * });
 *
 * expect(container.querySelector('span')?.textContent).toBe('str');
 * ```
 */
export function useConnector<T>(
  selector: () => T,
  shallowEqual?: ShallowEqual
) {
  try {
    return useSelector(
      selector,
      shallowEqual || areShallowEqualWithObject
    ) as T;
  } catch (e) {
    try {
      useStore();
    } catch (error) {
      console.error(`No class with a field decorated by '@state' is injected.`);
      throw e;
    }
    throw e;
  }
}
