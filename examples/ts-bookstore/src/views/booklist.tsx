import React from 'react';
import { Link } from 'reactant-web';
import { ViewModule, injectable, useConnector } from 'reactant';
import { Books } from '../modules/books';
import { BookItem } from '../components/BookItem';
import { BookView } from './book';

@injectable()
class BookListView extends ViewModule {
  constructor(private books: Books, private bookView: BookView) {
    super();
  }

  component() {
    const data = useConnector(() => this.books.getBooksList());
    return (
      <ul>
        {data.map(book => (
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
