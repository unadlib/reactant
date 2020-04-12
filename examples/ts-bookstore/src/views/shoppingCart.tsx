import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  createSelector,
} from 'reactant';
import { ShoppingCart } from '../modules/shoppingCart';
import { Books } from '../modules/books';
import { BookItem } from '../components/BookItem';
import { BookView } from './book';

@injectable()
class ShoppingCartView extends ViewModule {
  constructor(
    private shoppingCart: ShoppingCart,
    private books: Books,
    private bookView: BookView
  ) {
    super();
  }

  routerName = 'Shopping Cart';

  path = '/shoppingCart';

  getData = createSelector(
    () => this.shoppingCart.list,
    () => this.books.books,
    (list, books) => list.map(({ count, id }) => ({ ...books[id], count }))
  );

  component() {
    const data = useConnector(this.getData);
    return (
      <ul>
        {this.routerName}
        {data.map(item => (
          <li key={item.id}>
            <BookItem link={this.bookView.getLink(item.id)} {...item} />
          </li>
        ))}
      </ul>
    );
  }
}

export { ShoppingCartView };
