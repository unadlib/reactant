import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'reactant-web';
import { ViewModule, injectable } from 'reactant';
import { Router } from 'reactant-router';
import { BooksModule } from '../modules/books';
import { BookView } from './book';
import { BookListView } from './booklist';
import { ShoppingCartView } from './shoppingCart';

@injectable()
class HomeView extends ViewModule {
  constructor(
    public books: BooksModule,
    public bookView: BookView,
    public bookListView: BookListView,
    public shoppingCartView: ShoppingCartView,
    public router: Router
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
          <Route path={this.bookView.path}>
            <this.bookView.component />
          </Route>
          <Route path={this.shoppingCartView.path}>
            <this.shoppingCartView.component />
          </Route>
        </Switch>
      </>
    );
  }
}

export { HomeView };
