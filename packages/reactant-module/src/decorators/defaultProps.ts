import { PickOptional } from '../interfaces';

/**
 * ## Description
 *
 * `@defaultProps()` is used to decorate a ViewModule's function component for its default props.
 *
 * ## Example
 *
 * ```tsx
 * @injectable()
 * class CounterView extends ViewModule {
 *   @defaultProps({
 *     version: '0.0.1'
 *   })
 *   component({ version }: { version?: string }) {
 *     return <span>{version}</span>;
 *   }
 * }
 *
 * @injectable()
 * class AppView extends ViewModule {
 *   constructor(public counterView: CounterView) {}
 *
 *   component() {
 *     return (<>
 *       <this.counterView.component />
 *       <this.counterView.component version="0.1.0" />
 *     </>);
 *   }
 * }
 *
 * const app = createApp({
 *   modules: [],
 *   main: AppView,
 *   render: () => () => {},
 * });
 * ```
 */
export function defaultProps<P>(
  /** default props for the current React function component */
  props: P | PickOptional<P>
) {
  return (
    target: object,
    key: string | symbol,
    { value, ...rest }: TypedPropertyDescriptor<(props: P) => JSX.Element>
  ) => {
    Object.assign(value, {
      defaultProps: props,
    });
    return { value, ...rest };
  };
}
