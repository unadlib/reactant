import { injectable, action, batch, state } from 'reactant';
import { schema, normalize } from 'normalizr';
import { Comments, Comment, CommentsModule } from './comments';
import { Users, User } from './users';

export interface Book<T = Comment['id']> {
  id: string;
  name: string;
  count: number;
  price: number;
  comments: T[];
}

export type BookList = Book['id'][];

export type Books = Record<Book['id'], Book>;

interface Entities {
  books: Books;
  comments: Comments;
  users: Users;
}

@injectable()
class BooksModule {
  constructor(public comments: CommentsModule) {}

  schema = [
    new schema.Entity('books', {
      comments: [this.comments.schema],
    }),
  ];

  @state
  books: Books = {};

  @state
  list: BookList = [];

  @action
  updateBooksList(books: Books, list: BookList) {
    this.list.push(...list);
    this.books = {
      ...this.books,
      ...books,
    };
  }

  async fetchBooksList() {
    const mockData: Book<Comment<User>>[] = [
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
    const { result, entities } = normalize<Book[], Entities, BookList>(
      mockData,
      this.schema
    );
    batch(() => {
      this.updateBooksList(entities.books, result);
      this.comments.updateComments(entities.comments);
      this.comments.addCommentUsers(entities.users);
    });
  }
}

export { BooksModule };
