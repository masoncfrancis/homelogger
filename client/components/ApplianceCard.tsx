import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

interface ApplianceCardProps {
  id: number;
  makeModel: string;
  yearPurchased: string;
  purchasePrice: string;
  location: string;
  type: string;
}

const ApplianceCard: React.FC<ApplianceCardProps> = ({ id, makeModel, location, type }) => {
  return (
    <Link href={`/appliance/${id}`} passHref>
      <Card style={{ width: '18rem', margin: '0', padding: '0', cursor: 'pointer' }}>
        <Card.Body>
          <Card.Title>{makeModel}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
          <Card.Text>
            <strong>Location:</strong> {location}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ApplianceCard;