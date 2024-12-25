// pages/appliance/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card } from 'react-bootstrap';
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

  if (!appliance) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MyNavbar />
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{appliance.makeModel}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{appliance.type}</Card.Subtitle>
              <Card.Text>
                <strong>Year Purchased:</strong> {appliance.yearPurchased}<br />
                <strong>Purchase Price:</strong> {appliance.purchasePrice}<br />
                <strong>Location:</strong> {appliance.location}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppliancePage;