import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from '../components/TodoItem';

// Get server url from environment variable
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const todoUrl = `${SERVER_URL}/todo`;

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<{ _id: string; task: string; checked: boolean; userid: number }[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(todoUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Container>
      <MyNavbar />
      <p id='serverurl'>{SERVER_URL}</p>
      <p id='maintext'>To do:</p>
      
      <ListGroup>
        {todos.map((todo, index) => (
          <TodoItem id={todo._id} label={todo.task} checked={todo.checked} />
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodoPage;