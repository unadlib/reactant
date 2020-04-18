import { injectable, action, batch, state, createSelector } from 'reactant';
import { schema, normalize } from 'normalizr';
import { IComments, IComment, IUsers, IUser, IBooks, IBook } from '../model';
import { Comments } from './comments.service';

export type IBookList = IBook['id'][];

interface IEntities {
  books: IBooks;
  comments: IComments;
  users: IUsers;
}

@injectable()
class Books {
  constructor(private comments: Comments) {}

  schema = [
    new schema.Entity('books', {
      comments: [this.comments.schema],
    }),
  ];

  @state
  books: IBooks = {};

  @state
  list: IBookList = [];

  @action
  updateBooksList(books: IBooks, list: IBookList) {
    this.list.push(...list);
    this.books = {
      ...this.books,
      ...books,
    };
  }

  getBooksList = createSelector(
    () => this.list,
    () => this.books,
    (list, books) => list.map(id => books[id])
  );

  async fetchBooksList() {
    const mockData: IBook<IComment<IUser>>[] = [
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
    const { result, entities } = normalize<IBook[], IEntities, IBookList>(
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

export { Books };
