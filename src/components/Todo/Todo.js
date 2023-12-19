import { Badge, Button, ButtonGroup, ResourceItem } from "@shopify/polaris";
import "./todo.css";

const Todo = ({ item, handleComplete, handleDelete }) => {
  const { id, text, isCompleted } = item;
  return (
    <ResourceItem id={id}>
      <div className="todo-wrapper">
        <p>{text}</p>
        <ButtonGroup>
          {isCompleted ? (
            <Badge status="success">Done</Badge>
          ) : (
            <Badge>Pending</Badge>
          )}
          <Button onClick={() => handleComplete(id, isCompleted)}>
            {isCompleted ? "UnComplete" : "Complete"}
          </Button>
          <Button destructive onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </ResourceItem>
  );
};

export default Todo;
