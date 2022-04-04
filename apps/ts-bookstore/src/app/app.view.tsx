import React from 'react';

import { computed, injectable, useConnector, ViewModule } from 'reactant';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { List } from './components/List';
import { TodoService } from './todo.service';

@injectable()
class AppView extends ViewModule {
  constructor(public todo: TodoService) {
    super();
  }

  @computed(({ todo }: AppView) => [todo.visibilityFilter, todo.list])
  get filteredList() {
    return this.todo.list.filter(
      (item) =>
        (this.todo.visibilityFilter === 'Active' && !item.completed) ||
        (this.todo.visibilityFilter === 'Completed' && item.completed) ||
        this.todo.visibilityFilter === 'All'
    );
  }

  @computed(({ todo }: AppView) => [todo.list])
  get completedTodoList() {
    return this.todo.list.filter((item) => item.completed);
  }

  @computed(({ todo, completedTodoList }: AppView) => [todo, completedTodoList])
  get allSelected() {
    return (
      this.todo.list.length > 0 &&
      this.completedTodoList.length === this.todo.list.length
    );
  }

  @computed(({ todo }: AppView) => [todo.list])
  get activeCount() {
    return this.todo.list.filter(({ completed }) => !completed).length;
  }

  get completedCount() {
    return this.todo.list.length - this.activeCount;
  }

  onToggleAll = () => this.todo.toggleAll(this.allSelected);

  component() {
    const data = useConnector(() => ({
      filteredList: this.filteredList,
      allSelected: this.allSelected,
      visibilityFilter: this.todo.visibilityFilter,
    }));

    return (
      <div>
        <Header onAdd={this.todo.add} />
        <List
          filteredList={data.filteredList}
          allSelected={data.allSelected}
          onToggleAll={this.onToggleAll}
          onEdit={this.todo.edit}
          onToggle={this.todo.toggle}
          onDelete={this.todo.delete}
        />
        <Footer
          activeCount={this.activeCount}
          completedCount={this.completedCount}
          filters={this.todo.filters}
          visibilityFilter={data.visibilityFilter}
          onClearCompleted={this.todo.clearCompleted}
          onSetVisibilityFilter={this.todo.setVisibilityFilter}
        />
      </div>
    );
  }
}

export { AppView };
