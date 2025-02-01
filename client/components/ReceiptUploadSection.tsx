import React, { useState } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import ReceiptList from '@/components/ReceiptList';

interface Receipt {
    id: number;
    file: File;
    associatedId: number;
    type: 'maintenance' | 'repair';
}

interface ReceiptUploadSectionProps {
    show: boolean;
    handleClose: () => void;
    associatedId: number;
    type: 'maintenance' | 'repair';
}

const ReceiptUploadSection: React.FC<ReceiptUploadSectionProps> = ({ show, handleClose, associatedId, type }) => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const newReceipt: Receipt = {
                id: receipts.length + 1,
                file: selectedFile,
                associatedId,
                type
            };
            setReceipts([...receipts, newReceipt]);
            setSelectedFile(null);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Receipts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Upload Receipt</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
                        Upload
                    </Button>
                </Form>
                <ReceiptList receipts={receipts} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReceiptUploadSection;
