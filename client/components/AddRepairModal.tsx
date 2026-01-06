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
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (!show) {
            setDescription('');
            setDate('');
            setCost(0);
            setNotes('');
            setFiles([]);
        }
    }, [show]);

    const handleSubmit = async () => {
        const standardizedDate = new Date(date).toISOString().split('T')[0];

        const attachmentIds: number[] = [];

        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('userID', '1');

                const uploadResp = await fetch(`${SERVER_URL}/files/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResp.ok) {
                    console.error('Failed to upload attachment', file.name);
                    continue;
                }

                const uploadData = await uploadResp.json();
                if (uploadData && uploadData.id) {
                    attachmentIds.push(uploadData.id);
                }
            } catch (err) {
                console.error('Error uploading file:', err);
            }
        }

        const newRepair: any = {
            description,
            date: standardizedDate,
            cost,
            notes,
            spaceType,
            referenceType,
            applianceId: applianceId || 0,
            attachmentIds,
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
                        <Form.Group controlId="formFile">
                            <Form.Label>Attachment</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
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