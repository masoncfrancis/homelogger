import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from '../components/TodoItem';

// Get server url from environment variable
const SERVER_URL = process.env.SERVER_URL;
const todoUrl = `${SERVER_URL}/todo`;

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<{ label: string; checked: boolean }[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(todoUrl);
        const data = await response.json();
        setTodos(data.todo);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>To do:</p>
      <ListGroup>
        {todos.map((todo, index) => (
          <TodoItem key={index} label={todo.label} checked={todo.checked} />
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodoPage;