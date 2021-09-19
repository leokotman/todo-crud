import { List, Button } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

export default function TodoItem({ todo, handleEditClick, handleDeleteClick }) {
  return (
    <List.Item>
      {todo.text}
      <Button onClick={() => handleEditClick(todo)}>
        <EditTwoTone />
      </Button>
      <Button
        type="dashed"
        shape="round"
        onClick={() => handleDeleteClick(todo.id)}
      >
        <DeleteTwoTone />
      </Button>
    </List.Item>
  );
}
