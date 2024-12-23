import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import BlankCard from '../components/BlankCard';

const AppliancesPage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  const handleAddCardClick = () => {
    // Logic to add a new card
    console.log('Add new card clicked');
  };

  return (
    <Container>
      <MyNavbar />
      <p id='maintext'>Welcome to the appliances page.</p>
      <BlankCard onClick={handleAddCardClick} />
    </Container>
  );
};

export default AppliancesPage;