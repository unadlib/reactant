---
id: routing
title: Routing
---

Reactant provides a plugin for routing: reactant-router.

## API

* [ReactantRouter](api/reactant-router/classes/_router_.reactantrouter.md)
* [IRouterOptions](api/reactant-router/interfaces/_router_.irouteroptions.md)

## Installation

```sh
yarn install reactant-router
```

## Example

1. Import `Router` from `reactant-router`:

```ts
import React from 'react';
import { render } from 'reactant-web';
import { createApp } from 'reactant';
import { Router } from 'reactant-router';
import { HomeView } from './views';

const app = createApp({
  modules: [
    Router,
  ],
  main: HomeView,
  render,
  devOptions: {
    reduxDevTools: true,
  },
});

app.bootstrap(document.getElementById('app'));
```

2. Use APIs in `reactant-web`:

```tsx
import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'reactant-web';
import { ViewModule, injectable } from 'reactant';
import { Books } from '../modules/books.service';
import { BookView } from './book.view';
import { BookListView } from './bookList.view';
import { ShoppingCartView } from './shoppingCart.view';

@injectable()
class HomeView extends ViewModule {
  constructor(
    private books: Books,
    private bookView: BookView,
    private bookListView: BookListView,
    private shoppingCartView: ShoppingCartView
  ) {
    super();
  }

  component() {
    useEffect(() => {
      this.books.fetchBooksList();
    }, []);
    return (
      <>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={this.shoppingCartView.path}>
              {this.shoppingCartView.routerName}
            </Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <this.bookListView.component />
          </Route>
          <Route
            path={this.bookView.path}
            component={this.bookView.component}
          />
          <Route path={this.shoppingCartView.path}>
            <this.shoppingCartView.component />
          </Route>
        </Switch>
      </>
    );
  }
}

export { HomeView };
```

See [full example](https://github.com/unadlib/reactant/tree/master/examples/ts-bookstore).
