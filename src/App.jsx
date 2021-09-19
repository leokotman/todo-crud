import { useEffect, useState } from "react";
import { Button, Divider, List, Empty } from "antd";
import "./App.css";

import TodoItem from "./components/TodoItem.jsx";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(event) {
    setTodo(event.target.value);
  }
  function editInputChange(event) {
    setCurrentTodo({ ...currentTodo, text: event.target.value });
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
  function editFormSubmit(event) {
    console.log("input edited");
    event.preventDefault();
    updateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(itemId) {
    if(window.confirm("Are you sure you want to delete it?")) {
        const deleteItem = todos.filter((todo) => {
        return todo.id !== itemId;
        });
        setTodos(deleteItem);
    } else {
      const notRemovedItem = todos.find(elem => elem.id === itemId);
      console.log(notRemovedItem.text);
    }
  }

  function updateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }
  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      {isEditing ? (
        <form onSubmit={editFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo:</label>
          <input
            type="text"
            name="editTodo"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={editInputChange}
          />
          <Button type="default" onClick={editFormSubmit}>
            Update
          </Button>
          <Button type="dashed" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2>Add todo</h2>
          <input
            type="text"
            name="todo"
            placeholder="New todo"
            value={todo}
            onChange={handleInputChange}
          />
          <Button type="primary" onClick={handleFormSubmit}>
            Add
          </Button>
        </form>
      )}

      <Divider orientation="center">Todos</Divider>

      {todos.length === 0 ? (
        <Empty description={<span>No todos yet</span>} />
      ) : (
        <List
          bordered
          dataSource={todos}
          renderItem={(item) => (
            <TodoItem
              todo={item}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        ></List>
      )}
    </div>
  );
}

export default App;
