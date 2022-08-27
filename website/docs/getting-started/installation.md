---
sidebar_position: 1
---

# Installation

We recommend using the reactant-cli to quickly create a brand new Reactant project. See more information about [reactant-cli](#).

## Using reactant-cli

```bash
npx reactant-cli init my-app # default use TypeScript
# use `npx reactant-cli init my-app --language javascript` for creating a Javascript project.
cd my-app
yarn start
```

## Customize the creation of an Reactant project

> If you've already created your project using reactant-cli, please skip this section.

If you need to customize to create Reactant project, then you can do the following steps:

First, build a React project and you can visit [here](https://reactjs.org/docs/create-a-new-react-app.html) for more information.

then install Reactant dependencies:

```bash
yarn add reactant reactant-web
```

And set up the following related configuration.

>If using JavaScript, make sure you have `@babel/plugin-propose-decorators` and `@babel/plugin-propose-class-properties` installed and configured for Babel.

>If using TypeScript, make sure to enable `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`.

> If using TypeScript with Babel, you can install `babel-plugin-transform-typescript-metadata` for supporting TypeScript metadata with dependency injection, and set the babel configuration about it.
