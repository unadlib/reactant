// @ts-ignore
import { AppRegistry } from 'react-native';

const render = (app: JSX.Element, appName: string) => {
  AppRegistry.registerComponent(appName, () => () => app);
};

export { render };
