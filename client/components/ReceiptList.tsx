import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface Receipt {
    id: number;
    file: File;
    associatedId: number;
    type: 'maintenance' | 'repair';
}

interface ReceiptListProps {
    receipts: Receipt[];
    onAddReceipt: () => void;
}

const ReceiptList: React.FC<ReceiptListProps> = ({ receipts, onAddReceipt }) => {
    return (
        <ListGroup>
            {receipts.map((receipt) => (
                <ListGroup.Item key={receipt.id}>
                    {receipt.file.name} (Associated with {receipt.type} ID: {receipt.associatedId})
                </ListGroup.Item>
            ))}
            <ListGroup.Item action onClick={onAddReceipt} style={{ cursor: 'pointer' }}>
                <i className="bi bi-plus-square-fill" style={{ fontSize: '1.5rem' }}></i>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default ReceiptList;