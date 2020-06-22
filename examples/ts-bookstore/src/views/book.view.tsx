import React from 'react';
import { useParams, useHistory } from 'reactant-web';
import { ViewModule, injectable, useConnector, computed } from 'reactant';
import { Books, Comments, Users, ShoppingCart } from '../modules';
import { BookItem } from '../components';

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

  @computed(({ id, books, comments, users }: BookView) => [
    id,
    books.books,
    comments.comments,
    users.users,
  ])
  get data() {
    return {
      ...this.books.books[this.id!],
      // other way: it can use `denormalize` in `normalizr`.
      comments: this.books.books[this.id!].comments.map(commentId => ({
        ...this.comments.comments[commentId],
        user: this.users.users[this.comments.comments[commentId].user],
      })),
    };
  }

  path = `/book/:${indexKey}`;

  getLink(id: string) {
    return this.path.replace(`:${indexKey}`, id);
  }

  component() {
    const params = useParams<Params>();
    if (typeof params.id === 'undefined') return null;
    this.id = params.id;
    const data = useConnector(() => this.data);
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
