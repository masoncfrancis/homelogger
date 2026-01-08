'use client';

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from '../components/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from '../components/TodoItem';
import { SERVER_URL } from "@/pages/_app";

const todoUrl = `${SERVER_URL}/todo`;
const todoAddUrl = `${SERVER_URL}/todo/add`;

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Array<any>>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(todoUrl);
                const data = await response.json();

                // Enrich with appliance names when applicable
                const applianceIds: number[] = Array.from(new Set(data.filter((t: any) => t.applianceId).map((t: any) => Number(t.applianceId))));
                const nameMap: Record<number, string> = {};
                await Promise.all(applianceIds.map(async (id) => {
                    try {
                        const r = await fetch(`${SERVER_URL}/appliances/${id}`);
                        if (!r.ok) return;
                        const a = await r.json();
                        nameMap[id] = a.applianceName || `Appliance ${id}`;
                    } catch (e) {
                        console.error('Error loading appliance name', e);
                    }
                }));

                const enriched = data.map((t: any) => ({
                    ...t,
                    sourceLabel: t.applianceId ? nameMap[Number(t.applianceId)] : (t.spaceType || null),
                }));

                setTodos(enriched);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        const label = prompt('What should go in this item?');
        if (label) {
            const newTodo = { label, checked: false, userid: "1" };

            try {
                const response = await fetch(todoAddUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTodo),
                });

                if (!response.ok) {
                    throw new Error('Failed to add todo');
                }

                const addedTodo = await response.json();
                setTodos([...todos, addedTodo]);
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const handleDeleteTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <Container>
            <MyNavbar />
            <h4 id='maintext'>To-dos:</h4>

            <ListGroup>
                {todos.map((todo, index) => (
                    <TodoItem key={index} id={todo.id} label={todo.label} checked={todo.checked} onDelete={handleDeleteTodo} applianceId={todo.applianceId} spaceType={todo.spaceType} sourceLabel={todo.sourceLabel} />
                ))}
            </ListGroup>
            <i className="bi bi-plus-square-fill" onClick={handleAddTodo} style={{ fontSize: '2rem', cursor: "pointer" }}></i>
        </Container>
    );
};

export default TodoPage;