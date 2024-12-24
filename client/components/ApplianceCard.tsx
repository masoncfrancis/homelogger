import React from 'react';
import { Card } from 'react-bootstrap';

interface ApplianceCardProps {
  makeModel: string;
  yearPurchased: string;
  purchasePrice: string;
  location: string;
  type: string;
}

const ApplianceCard: React.FC<ApplianceCardProps> = ({ makeModel, location, type }) => {
  return (
    <Card style={{ width: '18rem', margin: '0', padding: '0' }}>
      <Card.Body>
        <Card.Title>{makeModel}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Text>
          <strong>Location:</strong> {location}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ApplianceCard;