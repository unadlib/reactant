import { injectable, action, batch } from 'reactant';
import { schema, normalize } from 'normalizr';
import { BookCommentsState, Comment, BookComments } from './comments';
import { CustomersState } from './customers';

export interface BookItem {
  id: string;
  name: string;
  count: number;
  price: number;
}

export interface Book extends BookItem {
  comments: Comment[];
}

export interface BookState extends BookItem {
  comments: Comment['id'][];
}

interface StoreBooksState {
  books: Record<Book['id'], BookState>;
  list: Book['id'][];
}

interface Entities {
  books: StoreBooksState['books'];
  comments: BookCommentsState['comments'];
  users: CustomersState['users'];
}

@injectable()
class StoreBooks {
  constructor(public bookComments: BookComments) {}

  schema = [
    new schema.Entity('books', {
      comments: [this.bookComments.schema],
    }),
  ];

  state: StoreBooksState = {
    books: {},
    list: [],
  };

  @action
  updateBooksList(storeBooks: StoreBooksState) {
    this.state.list.push(...storeBooks.list);
    this.state.books = {
      ...this.state.books,
      ...storeBooks.books,
    };
  }

  async fetchBooksList() {
    const mockData: Book[] = [
      {
        id: '1',
        name: 'The Moon and Sixpence',
        comments: [
          {
            id: '1',
            content: 'Good book!',
            user: { id: '17', username: 'foobar' },
          },
        ],
        count: 99,
        price: 15.2,
      },
    ];
    const { result, entities } = normalize<Book[], Entities, Book['id'][]>(
      mockData,
      this.schema
    );
    batch(() => {
      this.updateBooksList({
        list: result,
        books: entities.books,
      });
      this.bookComments.updateComments(entities.comments);
      this.bookComments.addCommentUsers(entities.users);
    });
  }
}

export { StoreBooks };
