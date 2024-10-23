import { Todo } from "../../types/Todo";
import { TodoInfo } from "../TodoInfo/TodoInfo";

interface TodoListProps {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoList = ({ todos, toggleCompletion, deleteTodo, onEdit }: TodoListProps) => {
  return (
    <section className="todo-list">
      {todos.map((todo) => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          toggleCompletion={toggleCompletion}
          deleteTodo={deleteTodo}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
};
