import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

interface TodoItemProps {
    label: string;
    checked: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ label, checked }) => {
  return (
    <ListGroup.Item>
      <Form.Check type='checkbox' label={label} defaultChecked={checked} />
    </ListGroup.Item>
  );
};

export default TodoItem;