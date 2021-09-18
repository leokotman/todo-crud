import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  function handleInputChange(event) {
    setTodo(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="New todo"
          value={todo}
          onChange={handleInputChange}
        />
      </form>

      <ul className="todo_list">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
