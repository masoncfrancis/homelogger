// pages/index.tsx
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <Navbar expand="lg">
        <Navbar.Brand href="#home">HomeLogger</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Water + Sewer</Nav.Link>
            <Nav.Link href="#">HVAC</Nav.Link>
            <Nav.Link href="#">Electrical</Nav.Link>
            <Nav.Link href="#">Appliances</Nav.Link>
            <Nav.Link href="#">Exterior</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <p id="main">Welcome to the main page content.</p>
    </Container>

  );
};

export default HomePage;
