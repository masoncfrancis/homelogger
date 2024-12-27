import React from 'react';
import {Card} from 'react-bootstrap';
import Link from 'next/link';

interface ApplianceCardProps {
    id: number;
    applianceName: string;
    makeModel: string;
    yearPurchased: string;
    purchasePrice: string;
    location: string;
    type: string;
}

const ApplianceCard: React.FC<ApplianceCardProps> = ({
                                                         id,
                                                         applianceName,
                                                         makeModel,
                                                         yearPurchased,
                                                         purchasePrice,
                                                         location,
                                                         type
                                                     }) => {
    return (
        <Link href={`/appliance/${id}`} legacyBehavior passHref>
            <a style={{textDecoration: 'none'}}>
                <Card style={{width: '18rem', margin: '0', padding: '0', cursor: 'pointer'}}>
                    <Card.Body>
                        <Card.Title>{applianceName}</Card.Title>
                        <Card.Text>
                            <strong>Location:</strong> {location}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </a>
        </Link>
    );
};

export default ApplianceCard;