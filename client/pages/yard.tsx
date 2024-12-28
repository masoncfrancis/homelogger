// pages/yard.tsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';

const ExteriorPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>Yard content here</p>
    </Container>
  );
};

export default ExteriorPage;
