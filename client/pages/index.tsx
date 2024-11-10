// pages/index.tsx
import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const [key, setKey] = useState<string>('main');

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Home Page</h1>
      
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || 'main')}
        className="mb-3"
      >
        <Tab eventKey="main" title="Main">
          <p>Welcome to the main page content.</p>
        </Tab>
        <Tab eventKey="water" title="Water">
          <p>Add information about water systems here</p>
        </Tab>
        <Tab eventKey="hvac" title="HVAC">
          <p>Add information about HVAC systems here</p>
        </Tab>
        <Tab eventKey="electric" title="Electrical">
          <p>Add information about electrical systems here</p>
        </Tab>
        <Tab eventKey="appliances" title="Appliances">
          <p>Add informatino about your appliances here</p>
        </Tab>
        <Tab eventKey="cosmetics" title="Cosmetics">
          <p>Add information about cosmetic work done on your home here.</p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default HomePage;
