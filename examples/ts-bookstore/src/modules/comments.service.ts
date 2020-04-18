import { injectable, action, state } from 'reactant';
import { schema } from 'normalizr';
import { Users } from './users.service';
import { IComment, IComments, IUsers } from '../model';

@injectable()
class Comments {
  constructor(private users: Users) {}

  schema = new schema.Entity('comments', {
    user: this.users.schema,
  });

  @state
  comments: IComments = {};

  @action
  updateComments(comments: IComments) {
    this.comments = {
      ...this.comments,
      ...comments,
    };
  }

  addCommentUsers(users: IUsers) {
    this.users.updateUsers(users);
  }

  @action
  modifyComment(comment: IComment) {
    this.comments[comment.id] = comment;
  }
}

export { Comments };
