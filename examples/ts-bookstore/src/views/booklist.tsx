import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  createSelector,
} from 'reactant';
import { BooksModule } from '../modules/books';

@injectable()
class BookListView extends ViewModule {
  constructor(public books: BooksModule) {
    super();
  }

  component() {
    const data = useConnector(() => this.books.books);
    return null;
  }
}

export { BookListView };
