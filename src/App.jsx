import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/todos')
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => {
        console.error('Error occured on fetching', err);
      });
  }, []);

  function addTodo(todo) {
    if (todo === '') return;
    const newTodo = {
      title: todo,
      completed: false,
    };

    axios
      .post('http://localhost:3001/todos', newTodo)
      .then((res) => {
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.log('Error occurred while adding todo:', err);
      });
  }
  //
  function toggleCompleted(id) {
    let tmp = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    setTodos(tmp);
  }

  function deleteTodo(index) {
    const todoToDelete = todos[index];
    if (!todoToDelete) return;

    axios
      .delete(`http://localhost:3001/todos/${todoToDelete.id}`)
      .then((res) => {
        const updatedTodos = todos.filter((todo) => todo.id != res.data.id);
        setTodos(updatedTodos);
      })
      .catch((err) => {
        console.log('Error occurred while deleting todo:', err);
      });
  }

  function editTodo(title) {}
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
