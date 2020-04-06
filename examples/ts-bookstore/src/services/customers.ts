import { injectable, action } from 'reactant';
import { schema } from 'normalizr';

interface UserItem {
  id: string;
  username: string;
}

export type User = UserItem;

export interface CustomersState {
  users: Record<User['id'], User>;
}

@injectable()
class Customers {
  schema = new schema.Entity('users');

  state: CustomersState = {
    users: {},
  };

  @action
  updateUsers(users: CustomersState['users']) {
    this.state.users = {
      ...this.state.users,
      ...users,
    };
  }
}

export { Customers };
