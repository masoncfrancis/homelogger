import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SERVER_URL } from "@/pages/_app";
import { MaintenanceRecord, ReferenceType, SpaceType } from './MaintenanceSection';

interface AddMaintenanceModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (maintenance: MaintenanceRecord) => void;
    applianceId?: number;
    referenceType: ReferenceType;
    spaceType: SpaceType;
}

const AddMaintenanceModal: React.FC<AddMaintenanceModalProps> = ({
    show,
    handleClose,
    handleSave,
    applianceId,
    referenceType,
    spaceType
}) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [cost, setCost] = useState(0);
    const [notes, setNotes] = useState('');

    const handleSubmit = async () => {
        // Standardize the date format to ISO 8601
        const standardizedDate = new Date(date).toISOString().split('T')[0];

        const newMaintenance: MaintenanceRecord = {
            id: 0,
            description,
            date: standardizedDate,
            cost,
            notes,
            spaceType,
            referenceType,
            applianceId: applianceId || 0
        };

        try {
            const response = await fetch(`${SERVER_URL}/maintenance/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMaintenance),
            });

            if (!response.ok) {
                throw new Error('Failed to add maintenance record');
            }

            const addedMaintenance = await response.json();
            handleSave(addedMaintenance);
            handleClose();
        } catch (error) {
            console.error('Error adding maintenance record:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Maintenance Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCost">
                        <Form.Label>Cost</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter cost"
                            value={cost}
                            onChange={(e) => setCost(parseFloat(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddMaintenanceModal;