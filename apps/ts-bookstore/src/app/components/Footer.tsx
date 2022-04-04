import React, { FC } from "react";
import { VisibilityFilter, Filters } from "../todo.service";

interface FooterProps {
  activeCount: number;
  completedCount: number;
  visibilityFilter: string;
  filters: Filters;
  onClearCompleted(): void;
  onSetVisibilityFilter(filter: VisibilityFilter): void;
}

export const Footer: FC<FooterProps> = ({
  activeCount,
  completedCount,
  filters,
  visibilityFilter,
  onClearCompleted,
  onSetVisibilityFilter,
}) => {
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter}>
            <a
              className={visibilityFilter === filter ? "selected" : ""}
              style={{ cursor: "pointer" }}
              onClick={() => {
                onSetVisibilityFilter(filter);
              }}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
