/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useState } from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  spawn,
  computed,
  optional,
  Storage,
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
    @optional(Storage) protected storage?: Storage,
    @optional('TodoListViewOptions') private options?: TodoListViewOptions
  ) {
    super();
    this.storage?.setStorage(this, {
      blacklist: ['existDetachedWindow'],
    });
    if (this.isDetachedWindow) {
      window.addEventListener('unload', () => {
        spawn(this as TodoListView, 'setExistDetachedWindow', [false]);
      });
    }
  }

  name = 'todoList';

  path = '/todoList';

  @state
  existDetachedWindow = false;

  @action
  setExistDetachedWindow(value: boolean) {
    this.existDetachedWindow = value;
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
  add(text: string) {
    this.list.push({ id: Math.random().toString(), text, complete: false });
  }

  @action
  toggle(id: string) {
    const todo = this.list.find((item) => item.id === id)!;
    todo.complete = !todo.complete;
  }

  component(this: TodoListView) {
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
          onClick={async () => {
            await spawn(this, 'add', [todo]);
            setTodo('');
          }}
        >
          Add
        </button>
        {list.map(({ id, text, complete }) => (
          <li
            key={id}
            onClick={() => spawn(this, 'toggle', [id])}
            style={complete ? { textDecoration: 'line-through' } : {}}
          >
            {text}
          </li>
        ))}
        {!isDetachedWindow && (
          <button
            type="button"
            onClick={async () => {
              await spawn(this, 'setExistDetachedWindow', [true]);
              window.open('./detached-window.html', '', 'width=300,height=600');
            }}
          >
            Detach
          </button>
        )}
      </>
    );
  }
}
