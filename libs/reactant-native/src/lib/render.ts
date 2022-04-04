// TODO: wait for `@type/react-native` issue about `typedoc` building docs
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AppRegistry } from 'react-native';

const render = (app: JSX.Element, appName: string) => {
  AppRegistry.registerComponent(appName, () => () => app);
};

export { render };
