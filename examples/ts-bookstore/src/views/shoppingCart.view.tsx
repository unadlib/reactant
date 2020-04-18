import React from 'react';
import { ViewModule, injectable, useConnector, createSelector } from 'reactant';
import { Books, ShoppingCart } from '../modules';
import { BookItem } from '../components';
import { BookView } from './book.view';

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
