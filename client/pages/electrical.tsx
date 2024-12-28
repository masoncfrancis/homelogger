// pages/electrical.tsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';

const ElectricalPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>Electrical systems content here</p>
    </Container>

  );
};

export default ElectricalPage;
