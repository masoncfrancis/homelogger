import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

interface AddApplianceModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (makeModel: string, yearPurchased: string, purchasePrice: string, location: string) => void;
}

const AddApplianceModal: React.FC<AddApplianceModalProps> = ({show, handleClose, handleSave}) => {
    const [makeModel, setMakeModel] = React.useState('');
    const [yearPurchased, setYearPurchased] = React.useState('');
    const [purchasePrice, setPurchasePrice] = React.useState('');
    const [location, setLocation] = React.useState('');

    const handleSubmit = () => {
        handleSave(makeModel, yearPurchased, purchasePrice, location);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Appliance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMakeModel">
                        <Form.Label>Make and Model</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter make and model"
                            value={makeModel}
                            onChange={(e) => setMakeModel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formYearPurchased">
                        <Form.Label>Year Purchased</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter year purchased"
                            value={yearPurchased}
                            onChange={(e) => setYearPurchased(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPurchasePrice">
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter purchase price"
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
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

export default AddApplianceModal;