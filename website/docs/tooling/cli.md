---
sidebar_position: 1
---

# Reactant CLI

We recommend you install `reactant-cli` globally to use it.

```bash
npm install -g reactant-cli
```

or you can install `reactant-cli` to your project.

```bash
yarn add -D reactant-cli
```

## Create a Reactant project

```bash
npx reactant-cli init my-app
```

* Use `-l <language>`or `--language <language>` for specifying a language, support `js`, `ts`, `javascript`, and `typescript`, the default is `typescript`.

* Use `-t <type>`or `--type <type>` for specifying a type app, support `web`, `shared-tab`, and `shared-worker`, the default is `web`.

> `shared-tab` and `shared-worker` are shared App project templates based on `reactant-share`.

## Generate files 

### Generate a service file

```bash
npx reactant-cli generate service FooBar
# or alias
npx reactant-cli g s FooBar
```

### Generate a view file

```bash
npx reactant-cli generate view FooBarView
# or alias
npx reactant-cli g v FooBarView
```

---

* Use `-l <language>`or `--language <language>` for specifying a language, support `js`, `ts`, `javascript`, and `typescript`, the default is `typescript`.
* Use `-w` or `--withTests` for creating tests files, the default is not creating tests files.
* Use `-s <src>` or `--src <src>` for specifying source files path in your project root path, the default is `src`.

> It supports creating multiple files in any directory in the project using this command
