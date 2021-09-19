import { Button } from "antd";

export default function AddTodoForm({
  todo,
  handleFormSubmit,
  handleInputChange,
}) {
  return (
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
  );
}
