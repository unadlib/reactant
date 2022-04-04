import React, { FC } from "react";
import { Item } from "./Item";
import { Todo } from "../todo.service";

interface ListProps {
  filteredList: Todo[];
  allSelected: boolean;
  onToggleAll(): void;
  onEdit(id: string, text: string): void;
  onToggle(id: string): void;
  onDelete(id: string): void;
}

export const List: FC<ListProps> = ({
  filteredList,
  allSelected,
  onToggleAll,
  onEdit,
  onToggle,
  onDelete,
}) => (
  <section className="main">
    <input
      id="toggle-all"
      type="checkbox"
      className="toggle-all"
      checked={allSelected}
      onChange={onToggleAll}
    />
    <label htmlFor="toggle-all" />
    <ul className="todo-list">
      {filteredList.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  </section>
);
