import { injectable, action, state } from 'reactant';
import { schema } from 'normalizr';

export interface User {
  id: string;
  username: string;
}

export type Users = Record<User['id'], User>;

@injectable()
class UsersModule {
  schema = new schema.Entity('users');

  @state
  users: Users = {};

  @action
  updateUsers(users: Users) {
    this.users = {
      ...this.users,
      ...users,
    };
  }
}

export { UsersModule };
