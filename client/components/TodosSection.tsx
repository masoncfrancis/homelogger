import React, {useEffect, useState} from 'react';
import {Card, Button, Form, ListGroup} from 'react-bootstrap';
import TodoItem from './TodoItem';
import {SERVER_URL} from '@/pages/_app';

interface Props {
    applianceId?: number;
    spaceType?: string;
}

const TodosSection: React.FC<Props> = ({applianceId, spaceType}) => {
    const [todos, setTodos] = useState<Array<any>>([]);
    const [newLabel, setNewLabel] = useState('');

    const load = async () => {
        try {
            let url = `${SERVER_URL}/todo`;
            if (applianceId) url = `${url}?applianceId=${applianceId}`;
            else if (spaceType) url = `${url}?spaceType=${spaceType}`;

            const resp = await fetch(url);
            if (!resp.ok) return;
            const data = await resp.json();
            setTodos(data);
        } catch (err) {
            console.error('Error loading todos', err);
        }
    };

    useEffect(() => { load(); }, [applianceId, spaceType]);

    const handleAdd = async () => {
        if (!newLabel || newLabel.trim() === '') return;
        const body: any = { label: newLabel, checked: false, userid: '1' };
        if (applianceId) body.applianceId = applianceId;
        if (spaceType) body.spaceType = spaceType;

        try {
            const resp = await fetch(`${SERVER_URL}/todo/add`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
            });
            if (!resp.ok) throw new Error('Add failed');
            const added = await resp.json();
            setTodos(prev => [...prev, added]);
            setNewLabel('');
        } catch (err) {
            console.error('Error adding todo', err);
        }
    };

    const handleDelete = (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    return (
        <Card>
            <Card.Body>
                <h5>Todos</h5>
                {todos.length === 0 ? (
                    <div>No todos</div>
                ) : (
                    <ListGroup>
                        {todos.map((t: any) => (
                            <TodoItem key={t.id} id={t.id} label={t.label} checked={t.checked} onDelete={handleDelete} />
                        ))}
                    </ListGroup>
                )}

                <Form.Group controlId="todoAdd" style={{marginTop: '8px', display: 'flex'}}>
                    <Form.Control type="text" placeholder="New todo" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
                    <Button variant="primary" onClick={handleAdd} style={{marginLeft: '8px'}}>Add</Button>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default TodosSection;
