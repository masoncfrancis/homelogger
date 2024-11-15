// client/components/Navbar.tsx
import { Nav, Navbar } from 'react-bootstrap';

const MyNavbar: React.FC = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#home">HomeLogger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Plumbing</Nav.Link>
          <Nav.Link href="#">HVAC</Nav.Link>
          <Nav.Link href="#">Electrical</Nav.Link>
          <Nav.Link href="#">Appliances</Nav.Link>
          <Nav.Link href="#">Exterior</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;