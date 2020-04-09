import { injectable, action, state } from 'reactant';
import { schema } from 'normalizr';
import { User, UsersModule, Users } from './users';

export interface Comment<T = User['id']> {
  id: string;
  content: string;
  user: T;
}

export type Comments = Record<Comment['id'], Comment>;

@injectable()
class CommentsModule {
  constructor(public users: UsersModule) {}

  schema = new schema.Entity('comments', {
    user: this.users.schema,
  });

  @state
  comments: Comments = {};

  @action
  updateComments(comments: Comments) {
    this.comments = {
      ...this.comments,
      ...comments,
    };
  }

  addCommentUsers(users: Users) {
    this.users.updateUsers(users);
  }

  @action
  modifyComment(comment: Comment) {
    this.comments[comment.id] = comment;
  }
}

export { CommentsModule };
