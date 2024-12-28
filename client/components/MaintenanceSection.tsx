// client/components/Maintenance.tsx
import React from 'react';
import { Card } from 'react-bootstrap';

interface MaintenanceProps {
  maintenanceData: string; // Adjust the type based on your actual data structure
}

const MaintenanceSection: React.FC<MaintenanceProps> = ({ maintenanceData }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>{maintenanceData}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MaintenanceSection;