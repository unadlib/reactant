/* eslint-disable no-console */
import { useContext } from 'react';
import { useSelector, useStore } from 'react-redux';
import { areShallowEqualWithObject, Container } from 'reactant-module';
import { ContainerContext } from '../createApp';
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
  selector: (container: Container) => T,
  shallowEqual?: ShallowEqual
) {
  try {
    const container = useContext(ContainerContext);
    return useSelector(
      () => selector(container!) as Record<string, any>,
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
