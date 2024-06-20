import TodoItem from './TodoItem';
function TodoList({ todos, toggleCompleted, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          {...todo}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          index={index}
        />
      ))}
    </ul>
  );
}

export default TodoList;
