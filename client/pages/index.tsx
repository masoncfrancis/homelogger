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
        <Tab eventKey="mechanical" title="Mechanical">
          <p>Information about mechanical services and items.</p>
        </Tab>
        <Tab eventKey="appliances" title="Appliances">
          <p>Details on various appliances we offer.</p>
        </Tab>
        <Tab eventKey="cosmetics" title="Cosmetics">
          <p>Browse through our cosmetics products and offerings.</p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default HomePage;
