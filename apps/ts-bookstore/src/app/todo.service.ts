import { injectable, action, state, autobind } from 'reactant';

const filters = ['All', 'Active', 'Completed'] as const;

export type Filters = typeof filters;

export type VisibilityFilter = Filters[number];

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@injectable()
class TodoService {
  filters = filters;

  @state
  list: Todo[] = [
    {
      id: `${Math.random()}`,
      text: 'Use Reactant',
      completed: false,
    },
  ];

  @state
  visibilityFilter: VisibilityFilter = 'All';

  @autobind
  @action
  add(text: string) {
    this.list.push({
      id: `${Math.random()}`,
      text,
      completed: false,
    });
  }

  getItem(id: string) {
    return this.list.find((item) => item.id === id);
  }

  @autobind
  @action
  edit(id: string, text: string) {
    const item = this.getItem(id);
    if (item) {
      item.text = text;
    }
  }

  @autobind
  @action
  toggle(id: string) {
    const item = this.getItem(id);
    if (item) {
      item.completed = !item.completed;
    }
  }

  @action
  toggleAll(allCompleted: boolean) {
    this.list.forEach((item) => {
      if (item.completed !== !allCompleted) {
        item.completed = !allCompleted;
      }
    });
  }

  @autobind
  @action
  delete(id: string) {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  }

  @autobind
  @action
  clearCompleted() {
    this.list = this.list.filter((item) => item.completed === false);
  }

  @autobind
  @action
  setVisibilityFilter(filter: VisibilityFilter) {
    this.visibilityFilter = filter;
  }
}

export { TodoService };
