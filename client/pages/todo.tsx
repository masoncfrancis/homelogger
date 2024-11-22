import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from '../components/TodoItem';

const jsonObject = {
  "todo": [
    {
      "label": "Change anode rod",
      "checked": false
    },
    {
      "label": "Change air filter",
      "checked": true
    }
  ]
}

const TodoPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');
  const [todos, setTodos] = useState(jsonObject.todo);

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