// client/components/Navbar.tsx
import { Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const MyNavbar: React.FC = () => {

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">HomeLogger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} href="/">Home</Nav.Link>
          <Nav.Link as={Link} href="/todo">To Do</Nav.Link>
          <Nav.Link as={Link} href="/appliances">Appliances</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;