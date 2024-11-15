// pages/index.tsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';

const HomePage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>Welcome to the main page content.</p>
    </Container>

  );
};

export default HomePage;
