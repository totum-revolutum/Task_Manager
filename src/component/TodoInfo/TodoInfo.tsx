import { Todo } from '../../types/Todo';

interface TodoInfoProps {
  todo: Todo;
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoInfo = ({
  todo,
  toggleCompletion,
  deleteTodo,
  onEdit,
}: TodoInfoProps) => {
  return (
    <article className="flex justify-between w-full p-2 my-3 border border-black rounded-lg bg-antiquewhite">
      <div
        className={`todo-content ${todo.completed ? 'completed' : ''} flex-1 cursor-pointer`}
        onDoubleClick={() => onEdit(todo)}
      >
        <h3 className="todo-title my-1 text-lg font-bold">{todo.title}</h3>
        <p className="todo-description my-1 text-sm text-gray-600">
          {todo.description}
        </p>
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
