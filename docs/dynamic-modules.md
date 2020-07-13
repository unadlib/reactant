---
id: dynamic-modules
title: Dynamic Modules
---

Reactant supports dynamic module imports, make sure you set:
* `comments: true` in `.babalrc` (this is the default).
* `chunkFilename: '[name].bundle.js'` in your webpack config.

If you are using Typescript, also make sure:
* `removeComments: false` under compilerOptions in `tsconfig.json`(this is the default).
* `module: "esnext"` in `tsconfig.json`.

1. Define a module file for dynamic imports `count.ts`:

```ts
@injectable()
class Counter {
  @state
  count = 0;
}

export { Counter };
```

2. We can use utility type `ImportClass`  for definition as an interface type, and then using the standard dynamic import of API `import()`, and the `load()` provided by Reactant, this will allow us to fully implement the Reactant dynamic module imports.

```tsx
@injectable()
class Todo {
  @state
  list: string[] = [];

  @action
  add(text: string) {
    this.list.push(text);
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(
    public todo: Todo, 
    @optional() public counter?: ImportClass<typeof import('./counter'), 'Counter'>
  ) {}

  loadCounter = () => {
    const { Counter } = await import(/* webpackChunkName: "count" */ './count');
    load(this, { main: Counter }, module => {
      this.counter = module;
    });
  }

  component() {
    const { list, count } = useConnector(() => ({ list: this.todo.list, count: this.counter?.count }))
    return <>
      <ul>
        {this.todo.list.map((text, key) => <li key={key}>{text}</li>)}
      </ul>
      <button type="button" onClick={() => this.loadCounter()}>load</button>
      {count ?? 'none'}
    </>;
  }
}

const app = createApp({
  main: AppView,
  modules: [],
  render,
});

app.bootstrap(document.getElementById('app'));
```

In brief, we can split the code and build a minimally modular App that dynamically loads modules via the `load()` API so we can run the app more efficiently and lightly.
