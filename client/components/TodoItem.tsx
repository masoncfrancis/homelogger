import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState} from 'react';
import {SERVER_URL} from "@/pages/_app";

interface TodoItemProps {
    id: string;
    label: string;
    checked: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({id, label, checked}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const handleCheckboxChange = async () => {
        setIsChecked(!isChecked);

        try {
            const response = await fetch(SERVER_URL + `/todo/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({checked: !isChecked}),
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <Form.Check
                type='checkbox'
                label={label}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <span style={{cursor: 'pointer'}}>
                <i className="bi bi-trash"></i>
            </span>
        </ListGroup.Item>
    );
};

export default TodoItem;