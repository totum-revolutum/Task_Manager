import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';


interface Props {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, toggleCompletion, deleteTodo }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo}/>
      ))}
    </section>
  );
};