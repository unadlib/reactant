import { injectable, action } from 'reactant';
import { schema } from 'normalizr';
import { User, Customers, CustomersState } from './customers';

interface CommentItem {
  id: string;
  content: string;
}

export interface Comment extends CommentItem {
  user: User;
}

export interface CommentState extends CommentItem {
  user: User['id'];
}

export interface BookCommentsState {
  comments: Record<CommentItem['id'], CommentState>;
}

@injectable()
class BookComments {
  constructor(public customers: Customers) {}

  schema = new schema.Entity('comments', {
    user: this.customers.schema,
  });

  state: BookCommentsState = {
    comments: {},
  };

  @action
  updateComments(comments: BookCommentsState['comments']) {
    this.state.comments = {
      ...this.state.comments,
      ...comments,
    };
  }

  addCommentUsers(users: CustomersState['users']) {
    this.customers.updateUsers(users);
  }

  @action
  modifyComment(comment: CommentState) {
    this.state.comments[comment.id] = comment;
  }
}

export { BookComments };
