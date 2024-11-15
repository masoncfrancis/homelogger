// pages/index.tsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';



const TodoPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>To do:</p>
      <ListGroup>
        <ListGroup.Item>Item 1</ListGroup.Item>
        <ListGroup.Item>Item 2</ListGroup.Item>
        <ListGroup.Item>Item 3</ListGroup.Item>
      </ListGroup>
    
    </Container>

  );
};

export default TodoPage;
