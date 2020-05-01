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
