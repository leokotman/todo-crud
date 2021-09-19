import { Button } from "antd";

export default function EditTodoForm({
  currentTodo,
  setIsEditing,
  editInputChange,
  editFormSubmit,
}) {
  return (
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
  );
}
