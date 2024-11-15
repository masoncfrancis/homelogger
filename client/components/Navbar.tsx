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
          <Nav.Link as={Link} href="/plumbing" active={router.pathname === '/plumbing'}>Plumbing</Nav.Link>
          <Nav.Link as={Link} href="/hvac" active={router.pathname === '/hvac'}>HVAC</Nav.Link>
          <Nav.Link as={Link} href="/electrical" active={router.pathname === '/electrical'}>Electrical</Nav.Link>
          <Nav.Link as={Link} href="/appliances" active={router.pathname === '/appliances'}>Appliances</Nav.Link>
          <Nav.Link as={Link} href="/exterior" active={router.pathname === '/exterior'}>Exterior</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;