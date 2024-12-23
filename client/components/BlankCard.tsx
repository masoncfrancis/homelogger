import React from 'react';
import { Card } from 'react-bootstrap';

interface BlankCardProps {
  onClick: () => void;
}

const BlankCard: React.FC<BlankCardProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card style={{ width: '18rem', textAlign: 'center' }}>
        <Card.Body>
          <Card.Title>+</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlankCard;