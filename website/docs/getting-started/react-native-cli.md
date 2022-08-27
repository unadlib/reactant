---
sidebar_position: 4
---

# Using react-native

## Create app with React Native CLI

You can use `react-native-cli` or `@react-native-community/cli`.

```bash
npx react-native init MyApp
cd MyApp
```

> If using TypeScript, you can run `npx react-native init MyApp --template react-native-template-typescript`

## Install Reactant

You need to install `reactant`(Core API) and `reactant-native`(for Native API).

```bash
yarn add reactant reactant-native
```

## Add the babel configuration

Reactant development need `@babel/plugin-proposal-decorators` and `@babel/plugin-proposal-class-properties`. If you find that they are not installed, you need to install them:

```bash
yarn add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

And then add babel config in `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],
};
```

> If using TypeScript template, you can install `babel-plugin-transform-typescript-metadata` for supporting TypeScript metadata with dependency injection, and set the babel configuration about it.

## Add the example code with JavaScript

Change the code of the `index.js` file:

```jsx
import React from 'react';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';
import { render } from 'reactant-native';
import { View, Text, Button} from 'react-native';
import { name as appName } from './app.json';

@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }

  @action
  decrease() {
    this.count -= 1;
  }
}

@injectable({
  deps: [Counter],
})
class AppView extends ViewModule {
  constructor(counter) {
    super();
    this.counter = counter;
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <View>
        <Button onPress={() => this.counter.decrease()} title="-" />
        <Text>{count}</Text>
        <Button onPress={() => this.counter.increase()} title="+" />
      </View>
    );
  }
}

const app = createApp({
  main: AppView,
  render,
});

app.bootstrap(appName);
```
