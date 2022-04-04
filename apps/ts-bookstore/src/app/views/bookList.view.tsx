import React from 'react';
import { ViewModule, injectable, useConnector } from 'reactant';
import { Books } from '../modules';
import { BookItem } from '../components';
import { BookView } from './book.view';

@injectable()
class BookListView extends ViewModule {
  constructor(private books: Books, private bookView: BookView) {
    super();
  }

  component() {
    const data = useConnector(() => this.books.booksList);
    return (
      <ul>
        {data.map((book) => (
          <li key={book.id}>
            <BookItem
              key={book.id}
              link={this.bookView.getLink(book.id)}
              {...book}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export { BookListView };
