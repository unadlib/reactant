import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'reactant-web';
import { ViewModule, injectable, state, action, useConnector } from 'reactant';
import { Books } from '../modules/books.service';
import { BookView } from './book.view';
import { BookListView } from './bookList.view';
import { ShoppingCartView } from './shoppingCart.view';

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

@injectable()
class HomeView extends ViewModule {
  constructor(
    private counter: Counter,
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
    const count = useConnector(() => this.counter.count);

    console.log('!!!render');

    return (
      <>
        <button type="button" onClick={() => this.counter.decrease()}>
          -
        </button>
        <div>{count}</div>
        <button type="button" onClick={() => this.counter.increase()}>
          +
        </button>
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
