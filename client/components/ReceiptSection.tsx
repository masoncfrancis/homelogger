import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import AddReceiptModal from './AddReceiptModal';

interface Receipt {
    id: number;
    name: string;
    file: File | null;
}

const ReceiptSection: React.FC = () => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);

    const handleShowAddReceiptModal = () => setShowAddReceiptModal(true);
    const handleCloseAddReceiptModal = () => setShowAddReceiptModal(false);
    const handleSaveReceipt = (newReceipt: Receipt) => {
        setReceipts([...receipts, newReceipt]);
    };

    return (
        <Card>
            <Card.Body>
                <ListGroup>
                    {receipts.length === 0 ? (
                        <ListGroup.Item style={{ textAlign: 'center' }}>No receipts have been uploaded</ListGroup.Item>
                    ) : (
                        receipts.map(receipt => (
                            <ListGroup.Item key={receipt.id}>
                                {receipt.name}
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px',
                    fontWeight: 'bold'
                }}>
                    <i className="bi bi-plus-square-fill" style={{ fontSize: '2rem', cursor: "pointer" }}
                       onClick={handleShowAddReceiptModal}></i>
                </div>
            </Card.Body>
            <AddReceiptModal
                show={showAddReceiptModal}
                handleClose={handleCloseAddReceiptModal}
                handleSave={handleSaveReceipt}
            />
        </Card>
    );
};

export default ReceiptSection;
