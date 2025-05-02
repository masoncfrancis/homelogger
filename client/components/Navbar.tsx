// client/components/Navbar.tsx
import { useRouter } from 'next/router';
import { Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const MyNavbar: React.FC = () => {
  const router = useRouter();

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">HomeLogger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} href="/" active={router.pathname === '/'}>Home</Nav.Link>
          <Nav.Link as={Link} href="/todo.html" active={router.pathname === '/todo.html'}>To Do</Nav.Link>
          <Nav.Link as={Link} href="/appliances.html" active={router.pathname === '/appliances.html'}>Appliances</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;