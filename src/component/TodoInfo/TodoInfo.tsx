import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  toggleCompletion,
  deleteTodo,
}) => {
  return (
    <article
      className={classNames(
        'flex justify-between w-full p-2 my-3 border border-black rounded-lg bg-antiquewhite',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <div className="task">
        <h2 className="my-1 text-inherit font-bold">
          {todo.title}
        </h2>
        <h2 className="my-1 text-inherit">{todo.description}</h2>
      </div>

      <div className="flex flex-col gap-1 min-w-150">
        <button
          onClick={() => toggleCompletion(todo.id)}
          className={`text-white px-4 py-2 rounded transition ${todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {todo.completed ? 'Completed' : 'Not Completed'}
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </article>
  );
};
