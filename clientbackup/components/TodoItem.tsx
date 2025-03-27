import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { SERVER_URL } from "@/pages/_app";

interface TodoItemProps {
    id: string;
    label: string;
    checked: boolean;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, label, checked, onDelete }) => {
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

    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this?');
        if (confirmDelete) {
            try {
                const response = await fetch(SERVER_URL + `/todo/delete/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete todo');
                }

                onDelete(id);
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
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
            <span style={{ cursor: 'pointer' }}>
                <i className="bi bi-trash" onClick={handleDelete}></i>
            </span>
        </ListGroup.Item>
    );
};

export default TodoItem;