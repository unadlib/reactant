import { injectable, action, batch, state, computed } from 'reactant';
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
  updateBooksList({ books, comments, users }: IEntities, list: IBookList) {
    this.list.push(...list);
    this.books = {
      ...this.books,
      ...books,
    };
    this.comments.updateComments(comments);
    this.comments.addCommentUsers(users);
  }

  @computed(({ list, books }: Books) => [books, list])
  get booksList() {
    return this.list.map(id => this.books[id]);
  }

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
    const { entities, result } = normalize<IBook[], IEntities, IBookList>(
      mockData,
      this.schema
    );
    this.updateBooksList(entities, result);
  }
}

export { Books };
