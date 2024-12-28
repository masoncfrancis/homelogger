// pages/buildinginterior.tsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';

const InteriorPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>Building interior content here</p>
    </Container>
  );
};

export default InteriorPage;
