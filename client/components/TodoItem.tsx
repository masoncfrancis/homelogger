import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { SERVER_URL } from "@/pages/_app";

interface TodoItemProps {
    id: string;
    label: string;
    checked: boolean;
    onDelete: (id: string) => void;
    applianceId?: number;
    spaceType?: string;
    sourceLabel?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, label, checked, onDelete, applianceId, spaceType, sourceLabel }) => {
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

    const sourceText = sourceLabel ? sourceLabel : (spaceType ? `Space: ${spaceType}` : (applianceId ? `Appliance ID: ${applianceId}` : 'General'));

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div style={{ flex: 1 }}>
                <Form.Check
                    type='checkbox'
                    label={
                        <>
                            <div>{label}</div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{sourceText}</div>
                        </>
                    }
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </div>
            <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
                <i className="bi bi-trash" onClick={handleDelete}></i>
            </span>
        </ListGroup.Item>
    );
};

export default TodoItem;