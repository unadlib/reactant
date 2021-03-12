---
id: dynamic-modules
title: Dynamic Modules
---

Code-splitting is important for many large projects, and Reactant supports dynamic loading of split code by modules.

## Configuration

Reactant supports dynamic module imports, make sure you set:

- `comments: true` in `.babalrc` (this is the default).
- `chunkFilename: '[name].bundle.js'` in your webpack config.

If you are using Typescript, also make sure:

- `removeComments: false` under compilerOptions in `tsconfig.json`(this is the default).
- `module: "esnext"` in `tsconfig.json`.

## Usage

1. Define a module file for dynamic imports `Counter.service.ts`:

```ts
@injectable()
class CounterService {
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

export { CounterService };
```

2. We can use utility type `ImportClass` for definition as an interface type, and then using the standard dynamic import of API `import()` and `@lazy()`, and the [`load()`](api/reactant-module/modules/_core_load_.md) provided by Reactant, this will allow us to fully implement the Reactant dynamic module imports.

```tsx
@injectable()
class TodoService {
  @state
  list: string[] = [];

  @action
  add(text: string) {
    this.list.push(text);
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public todo: TodoService) {
    super();
  }

  loadCounter = async () => {
    const { CounterService } = await import(
      /* webpackChunkName: "Counter.service" */ './Counter.service'
    );
    await load(this, [{ provide: 'counter', useClass: CounterService }]);
  };

  @lazy('counter')
  counter?: ImportClass<typeof import('./Counter.service'), 'CounterService'>;
  // or use `import type { CounterService } from './Counter.service';` in TypeScript 3.8+

  component() {
    const { list, count } = useConnector(() => ({
      list: this.todo.list,
      count: this.counter?.count,
    }));
    const [value, setValue] = useState('');
    return (
      <>
        <input onChange={(e) => setValue(e.target.value)} value={value} />
        <button
          type={'button'}
          onClick={() => {
            this.todo.add(value);
            setValue('');
          }}
        >
          Add Todo
        </button>
        <ul>
          {list.map((text, key) => (
            <li key={key}>{text}</li>
          ))}
        </ul>
        <button type="button" onClick={() => this.loadCounter()}>
          load counter
        </button>
        {this.counter ? (
          <button onClick={() => this.counter?.increase()}>{count}</button>
        ) : (
          'none'
        )}
      </>
    );
  }
}

const app = createApp({
  main: AppView,
  modules: [],
  render,
});

app.bootstrap(document.getElementById('app'));
```

[Visit here to see the example source code.](<(https://github.com/unadlib/reactant-examples/tree/master/web/dynamic-module)>)

In brief, we can split the code and build a minimally modular App that dynamically loads modules via the [`load()`](api/reactant-module/modules/_core_load_.md) API so we can run the app more efficiently and lightly. It usually works with `Suspense` as well. You visit [here](https://reactjs.org/docs/code-splitting.html) for more information on the component code-splitting.
