import React from 'react';
import { useParams, useHistory } from 'reactant-web';
import { ViewModule, injectable, useConnector, createSelector } from 'reactant';
import { Books } from '../modules/books';
import { Comments } from '../modules/comments';
import { Users } from '../modules/users';
import { ShoppingCart } from '../modules/shoppingCart';
import { BookItem } from '../components/BookItem';

const indexKey = 'id' as const;

type Params = Record<typeof indexKey, string>;

@injectable()
class BookView extends ViewModule {
  private id?: string;

  constructor(
    private books: Books,
    private comments: Comments,
    private users: Users,
    private shoppingCart: ShoppingCart
  ) {
    super();
  }

  getData = createSelector(
    () => this.id!,
    () => this.books.books,
    () => this.comments.comments,
    () => this.users.users,
    (id, books, comments, users) => {
      return {
        ...books[id],
        // other way: it can use `denormalize` in `normalizr`.
        comments: books[id].comments.map(commentId => ({
          ...comments[commentId],
          user: users[comments[commentId].user],
        })),
      };
    }
  );

  path = `/book/:${indexKey}`;

  getLink(id: string) {
    return this.path.replace(`:${indexKey}`, id);
  }

  component() {
    const params = useParams<Params>();
    if (typeof params.id === 'undefined') return null;
    this.id = params.id;
    const data = useConnector(this.getData);
    const history = useHistory();
    return (
      <div>
        <button onClick={() => history.goBack()} type="button">
          Go back
        </button>
        <BookItem {...data} />
        <button
          onClick={() => this.shoppingCart.addBook({ id: this.id!, count: 1 })}
          type="button"
        >
          Add a shopping cart
        </button>
        <p>Comments:</p>
        <ul>
          {data.comments.map(comment => {
            return (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.user.username}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export { BookView };
