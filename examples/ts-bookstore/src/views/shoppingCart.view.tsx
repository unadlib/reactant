import React from 'react';
import { ViewModule, injectable, useConnector, computed } from 'reactant';
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

  @computed(({ shoppingCart, books }: ShoppingCartView) => [
    shoppingCart.list,
    books.books,
  ])
  get data() {
    return this.shoppingCart.list.map(({ count, id }) => ({
      ...this.books.books[id],
      count,
    }));
  }

  component() {
    const data = useConnector(() => this.data);
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
