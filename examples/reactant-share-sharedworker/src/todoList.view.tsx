/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  proxify,
  computed,
  optional,
} from 'reactant-share';

interface Todo {
  id: string;
  text: string;
  complete: boolean;
}

interface TodoListViewOptions {
  isDetachedWindow?: boolean;
}
@injectable({
  name: 'todoListView',
})
export class TodoListView extends ViewModule {
  constructor(
    @optional('TodoListViewOptions') private options?: TodoListViewOptions
  ) {
    super();
    if (this.isDetachedWindow) {
      window.addEventListener('unload', () => {
        this.setExistDetachedWindow(false);
      });
    }
  }

  name = 'todoList';

  path = '/todoList';

  @state
  existDetachedWindow = false;

  @action
  _setExistDetachedWindow(value: boolean) {
    this.existDetachedWindow = value;
  }

  @proxify
  async setExistDetachedWindow(value: boolean) {
    this._setExistDetachedWindow(value);
  }

  @computed(({ existDetachedWindow }) => [existDetachedWindow])
  get shouldHidden() {
    return !this.isDetachedWindow && this.existDetachedWindow;
  }

  get isDetachedWindow() {
    return !!this.options?.isDetachedWindow;
  }

  @state
  list: Todo[] = [
    { id: Math.random().toString(), text: 'Use Reactant', complete: false },
  ];

  @action
  _add(text: string) {
    this.list.push({ id: Math.random().toString(), text, complete: false });
  }

  @action
  _toggle(id: string) {
    const todo = this.list.find((item) => item.id === id)!;
    todo.complete = !todo.complete;
  }

  @proxify
  async add(text: string) {
    return this._add(text);
  }

  @proxify
  async toggle(id: string) {
    return this._toggle(id);
  }

  component() {
    const [list, isDetachedWindow, shouldHidden] = useConnector(() => [
      this.list,
      this.isDetachedWindow,
      this.shouldHidden,
    ]);
    const [todo, setTodo] = useState('');
    if (shouldHidden) return null;
    return (
      <>
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button
          type="button"
          onClick={() => {
            this.add(todo);
            setTodo('');
          }}
        >
          Add
        </button>
        {list.map(({ id, text, complete }) => (
          <li
            key={id}
            onClick={() => this.toggle(id)}
            style={complete ? { textDecoration: 'line-through' } : {}}
          >
            {text}
          </li>
        ))}
        {!isDetachedWindow && (
          <button
            type="button"
            onClick={() => {
              this.setExistDetachedWindow(true);
              window.open(
                'http://localhost:7000/detached-window.html',
                '',
                'width=300,height=600'
              );
            }}
          >
            Detach
          </button>
        )}
      </>
    );
  }
}
