import React, { useState, FC } from "react";

interface HeaderProps {
  onAdd(text: string): void;
}

export const Header: FC<HeaderProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyPress={(e) => {
          if (e.which === 13) {
            onAdd(text.trim());
            setText("");
          }
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </header>
  );
};
