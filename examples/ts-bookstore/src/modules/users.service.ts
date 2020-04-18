import { injectable, action, state } from 'reactant';
import { schema } from 'normalizr';
import { IUsers } from '../model';

@injectable()
class Users {
  schema = new schema.Entity('users');

  @state
  users: IUsers = {};

  @action
  updateUsers(users: IUsers) {
    this.users = {
      ...this.users,
      ...users,
    };
  }
}

export { Users };
