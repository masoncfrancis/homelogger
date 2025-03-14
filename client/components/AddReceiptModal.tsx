import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AddReceiptModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (receipt: { id: number; name: string; file: File | null }) => void;
}

const AddReceiptModal: React.FC<AddReceiptModalProps> = ({ show, handleClose, handleSave }) => {
    const [receiptName, setReceiptName] = useState('');
    const [receiptFile, setReceiptFile] = useState<File | null>(null);

    const handleSubmit = () => {
        const newReceipt = { id: Date.now(), name: receiptName, file: receiptFile };
        handleSave(newReceipt);
        setReceiptName('');
        setReceiptFile(null);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formReceiptName">
                        <Form.Label>Receipt Nickname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter receipt nickname"
                            value={receiptName}
                            onChange={(e) => setReceiptName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formReceiptFile">
                        <Form.Label>Upload Receipt</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                setReceiptFile(target.files && target.files.length > 0 ? target.files[0] : null);
                            }}
                            accept=".jpg,.jpeg,.png"
                            multiple={false}
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

export default AddReceiptModal;
