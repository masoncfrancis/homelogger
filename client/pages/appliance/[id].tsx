import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from '../../components/Navbar';
import { SERVER_URL } from "@/pages/_app";

interface Appliance {
  id: number;
  makeModel: string;
  yearPurchased: string;
  purchasePrice: string;
  location: string;
  type: string;
}

const AppliancePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [appliance, setAppliance] = useState<Appliance | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`${SERVER_URL}/appliances/${id}`)
        .then(response => response.json())
        .then(data => setAppliance(data))
        .catch(error => console.error('Error fetching appliance:', error));
    }
  }, [id]);

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this appliance?')) {
      try {
        const response = await fetch(`${SERVER_URL}/appliances/delete/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete appliance');
        }

        router.push('/appliances');
      } catch (error) {
        console.error('Error deleting appliance:', error);
      }
    }
  };

  if (!appliance) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MyNavbar />
      <Row className="justify-content-center">
        <Col md={8}>
          <Tabs defaultActiveKey="main" id="appliance-tabs">
            <Tab eventKey="main" title="Main">
              <Card>
                <Card.Body>
                  <Card.Title>{appliance.makeModel}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{appliance.type}</Card.Subtitle>
                  <Card.Text>
                    <strong>Year Purchased:</strong> {appliance.yearPurchased}<br />
                    <strong>Purchase Price:</strong> {appliance.purchasePrice}<br />
                    <strong>Location:</strong> {appliance.location}
                  </Card.Text>
                  <Row>
                    <Col>
                      <Button variant="danger" onClick={handleDelete} style={{ marginTop: '10px' }}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="maintenance" title="Maintenance">
              <div>Maintenance content goes here.</div>
            </Tab>
            <Tab eventKey="repairs" title="Repairs">
              <div>Repairs content goes here.</div>
            </Tab>
            <Tab eventKey="documentation" title="Documentation">
              <div>Documentation content goes here.</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default AppliancePage;