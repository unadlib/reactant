import React, { useState, FC } from "react";
import { Todo } from "../todo.service";

interface ItemProps {
  todo: Todo;
  onEdit(id: string, text: string): void;
  onToggle(id: string): void;
  onDelete(id: string): void;
}

export const Item: FC<ItemProps> = ({ todo, onEdit, onToggle, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const onUpdate = () => {
    onEdit(todo.id, text.trim());
    setText(text);
    setEditing(false);
  };
  return (
    <li
      onDoubleClick={() => !editing && setEditing(true)}
      className={`${editing ? "editing" : ""} ${
        todo.completed ? "completed" : ""
      }`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          autoFocus
        />
        <label>{todo.text}</label>
        <button className="destroy" onClick={() => onDelete(todo.id)} />
      </div>
      {editing && (
        <input
          className="edit"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.which === 13) {
              onUpdate();
            }
          }}
          onBlur={onUpdate}
        />
      )}
    </li>
  );
};
