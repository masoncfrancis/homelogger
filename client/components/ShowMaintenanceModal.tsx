import React, { useState } from 'react';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { MaintenanceRecord } from './MaintenanceSection';
import { SERVER_URL } from "@/pages/_app";
import ReceiptUploadSection from '@/components/ReceiptUploadSection';
import ReceiptList from '@/components/ReceiptList';
import { Receipt } from '@/types/types';

interface ShowMaintenanceModalProps {
    show: boolean;
    handleClose: () => void;
    maintenanceRecord: MaintenanceRecord;
    handleDeleteMaintenance: (id: number) => void;
}

const ShowMaintenanceModal: React.FC<ShowMaintenanceModalProps> = ({ show, handleClose, maintenanceRecord, handleDeleteMaintenance }) => {
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [receipts, setReceipts] = useState<Receipt[]>([
        {
            id: 1,
            file: new File(["sample content"], "receipt1.pdf"),
            associatedId: maintenanceRecord.id,
            type: 'maintenance'
        },
        {
            id: 2,
            file: new File(["sample content"], "receipt2.pdf"),
            associatedId: maintenanceRecord.id,
            type: 'maintenance'
        }
    ]);

    const handleShowReceiptModal = () => setShowReceiptModal(true);
    const handleCloseReceiptModal = () => setShowReceiptModal(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                const response = await fetch(`${SERVER_URL}/maintenance/delete/${maintenanceRecord.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete maintenance record');
                }

                console.log('Record deleted');
                handleDeleteMaintenance(maintenanceRecord.id);
                handleClose();
            } catch (error) {
                console.error('Error deleting maintenance record:', error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Maintenance Record Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Description:</strong> {maintenanceRecord.description}</p>
                <p><strong>Date:</strong> {maintenanceRecord.date}</p>
                <p><strong>Cost:</strong> ${maintenanceRecord.cost}</p>
                <Form.Group>
                    <Form.Label><strong>Notes:</strong></Form.Label>
                    <div className='form-control mb-3'>
                        {maintenanceRecord.notes}
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Receipts:</strong></Form.Label>
                    <ReceiptList receipts={receipts.filter(receipt => receipt.associatedId === maintenanceRecord.id && receipt.type === 'maintenance')} onAddReceipt={handleShowReceiptModal} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
            <ReceiptUploadSection
                show={showReceiptModal}
                handleClose={handleCloseReceiptModal}
                associatedId={maintenanceRecord.id}
                type="maintenance"
            />
        </Modal>
    );
};

export default ShowMaintenanceModal;