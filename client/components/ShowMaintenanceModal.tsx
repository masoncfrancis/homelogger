import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {MaintenanceRecord} from './MaintenanceSection';
import {SERVER_URL} from "@/pages/_app";

interface ShowMaintenanceModalProps {
    show: boolean;
    handleClose: () => void;
    maintenanceRecord: MaintenanceRecord;
    handleDeleteMaintenance: (id: number) => void;
}

const ShowMaintenanceModal: React.FC<ShowMaintenanceModalProps> = ({show, handleClose, maintenanceRecord, handleDeleteMaintenance}) => {
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
                <p><strong>Notes:</strong> {maintenanceRecord.notes}</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowMaintenanceModal;