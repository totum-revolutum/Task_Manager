import { useState } from "react";
import { Todo } from "./types/Todo";
import { TodoList } from "./component/TodoList/TodoList";
import { Modal } from "./component/Modal/Modal";
import { ErrorMessage } from "./types/ErrorMessage";

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todoList');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [titleValue, setTitleValue] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const trimedTitleValue = titleValue.trim();
  const trimedDescriptionValue = descriptionValue.trim();

  const getTodoListId = (todos: Todo[]): number => {
    const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    return maxId + 1;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    setError('');
  };

  const reset = () => {
    setTitleValue('');
    setDescriptionValue('');
  };

  const addTodoToList = (todo: Todo) => {
    const updatedList = [todo, ...todoList];
    setTodoList(updatedList);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trimedTitleValue) {
      setTitleError(ErrorMessage.TITLE_ERROR);
    }

    if (!trimedDescriptionValue) {
      setDescriptionError(ErrorMessage.DESCRIPTION_ERROR);
    }

    if (!trimedTitleValue || !trimedDescriptionValue) {
      return;
    }

    if (editingTodo) {
      setTodoList(prevList =>
        prevList.map(todo =>
          todo.id === editingTodo.id
            ? { ...todo, title: trimedTitleValue, description: trimedDescriptionValue }
            : todo
        )
      );

      setEditingTodo(null);
    } else {
      addTodoToList({
        id: getTodoListId(todoList),
        title: trimedTitleValue,
        description: trimedDescriptionValue,
        completed: false,
      });
    }
    reset();
  };

  const toggleCompletion = (id: number) => {
    const updatedList = todoList.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedList);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  const deleteTodo = (id: number) => {
    const updatedList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedList);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setTitleValue(todo.title);
    setDescriptionValue(todo.description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    reset();
  };

  return (
    <div className="taskManager flex justify-center flex-col w-2/5 m-auto">
      <h1 className="flex justify-center text-2xl m-5">Task Manager</h1>

      <form onSubmit={handleSubmit} action="#" method="POST">
        <div className="field mb-2.5">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={titleValue}
              className="border border-black border-solid rounded-md p-1 w-full"
              onChange={(e) => handleInputChange(e, setTitleValue, setTitleError)}
            />
          </label>

          {titleError && <span className="text-red-500">Please enter a title</span>}
        </div>

        <div className="field mb-2.5">
          <label htmlFor="description">
            Description:&nbsp;
            <input
              type="text"
              name="description"
              placeholder="Enter a description"
              value={descriptionValue}
              className="border border-black border-solid rounded-md p-1 w-full"
              onChange={(e) => handleInputChange(e, setDescriptionValue, setDescriptionError)}
            />
          </label>
          {descriptionError && <span className="text-red-500">Please enter a description</span>}
        </div>

        <button type="submit" className="cursor-pointer bg-[#c0e5fb] rounded-md my-2.5 py-1.5 w-full">
          {editingTodo ? 'Save Changes' : 'Add'}
        </button>
      </form>

      <TodoList todos={todoList} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} onEdit={handleEdit} />

      {isModalOpen && (
        <Modal
          title={titleValue}
          description={descriptionValue}
          onSave={handleSubmit}
          onClose={closeModal}
          onTitleChange={(e) => handleInputChange(e, setTitleValue, setTitleError)}
          onDescriptionChange={(e) => handleInputChange(e, setDescriptionValue, setDescriptionError)}
        />
      )}
    </div>
  );
};
