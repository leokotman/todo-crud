import { useEffect, useState } from "react";
import { Divider, List, Empty } from "antd";
import "./App.css";

import TodoItem from "./components/TodoItem.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import EditTodoForm from "./components/EditTodoForm.jsx";

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
    if (window.confirm("Are you sure you want to delete it?")) {
      const itemToDelete = todos.find((elem) => elem.id === itemId);
      console.log("You deleted todo: " + itemToDelete.text);
      const deleteItem = todos.filter((todo) => {
        return todo.id !== itemId;
      });
      setTodos(deleteItem);
    } else {
      const notRemovedItem = todos.find((elem) => elem.id === itemId);
      console.log("This todo wasn't removed: " + notRemovedItem.text);
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
        <EditTodoForm
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          editInputChange={editInputChange}
          editFormSubmit={editFormSubmit}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
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
