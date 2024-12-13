import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { SERVER_URL } from '../pages/todo'; 

interface TodoItemProps {
    id: string;
    label: string;
    checked: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, label, checked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);

    try {
      const response = await fetch(SERVER_URL + `/todo/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: !isChecked }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <ListGroup.Item>
      <Form.Check
        type='checkbox'
        label={label}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </ListGroup.Item>
  );
};

export default TodoItem;