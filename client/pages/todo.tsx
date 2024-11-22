// pages/index.tsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';



const TodoPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>To do:</p>
      <ListGroup>
        <ListGroup.Item>
          <Form.Check type='checkbox' label='Item 1' />
        </ListGroup.Item>
        <ListGroup.Item>
          <Form.Check type='checkbox' label='Item 2' />
        </ListGroup.Item>
        <ListGroup.Item>
          <Form.Check type='checkbox' label='Item 1' />
        </ListGroup.Item>
      </ListGroup>
    
    </Container>

  );
};

export default TodoPage;
