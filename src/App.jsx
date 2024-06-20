import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      completed: true,
      title: '리액트 공부하기',
    },
    {
      id: 2,
      completed: false,
      title: '인사하기',
    },
  ]);

  function addTodo(todo) {
    if (todo == '') return;
    setTodos([
      ...todos,
      {
        title: todo,
        completed: false,
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      },
    ]);
  }
  function toggleCompleted(id) {
    let tmp = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    setTodos(tmp);
  }

  function deleteTodo(index) {
    let tmp = [...todos];
    tmp.splice(index, 1);
    setTodos(tmp);
  }

  //console.log(...todos);
  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-black-600 ml-2">TodoList</h1>
        </div>
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
