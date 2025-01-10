import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {SERVER_URL} from "@/pages/_app";
import {RepairRecord, RepairReferenceType, RepairSpaceType} from './RepairSection';

interface AddRepairModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (repair: RepairRecord) => void;
    applianceId?: number;
    referenceType: RepairReferenceType;
    spaceType: RepairSpaceType;
}

const AddRepairModal: React.FC<AddRepairModalProps> = ({
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

    useEffect(() => {
        if (!show) {
            setDescription('');
            setDate('');
            setCost(0);
            setNotes('');
        }
    }, [show]);

    const handleSubmit = async () => {
        const standardizedDate = new Date(date).toISOString().split('T')[0];

        const newRepair: RepairRecord = {
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
            const response = await fetch(`${SERVER_URL}/repair/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRepair),
            });

            if (!response.ok) {
                throw new Error('Failed to add repair record');
            }

            const addedRepair = await response.json();
            handleSave(addedRepair);
            handleClose();
        } catch (error) {
            console.error('Error adding repair record:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Repair Record</Modal.Title>
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

export default AddRepairModal;