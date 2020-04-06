import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  createSelector,
} from 'reactant';
import { StoreBooks } from '../services/books';

@injectable()
class BookListView extends ViewModule {
  constructor(public storeBooks: StoreBooks) {
    super();
  }

  component() {
    const data = useConnector(() => this.storeBooks.state.books);
    return null;
  }
}

export { BookListView };
