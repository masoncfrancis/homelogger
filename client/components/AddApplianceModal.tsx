import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

interface AddApplianceModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (applianceName: string, manufacturer: string, modelNumber: string, serialNumber: string, yearPurchased: string, purchasePrice: string, location: string, type: string) => void;
}

const AddApplianceModal: React.FC<AddApplianceModalProps> = ({show, handleClose, handleSave}) => {
    const [applianceName, setApplianceName] = React.useState('');
    const [manufacturer, setManufacturer] = React.useState('');
    const [modelNumber, setModelNumber] = React.useState('');
    const [serialNumber, setSerialNumber] = React.useState('');
    const [yearPurchased, setYearPurchased] = React.useState('');
    const [purchasePrice, setPurchasePrice] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [type, setType] = React.useState('');

    const handleSubmit = () => {
        handleSave(applianceName, manufacturer, modelNumber, serialNumber, yearPurchased, purchasePrice, location, type);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Appliance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formApplianceName">
                        <Form.Label>Appliance name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter appliance name..."
                            value={applianceName}
                            onChange={(e) => setApplianceName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option disabled={true} value="">Click to select appliance type...</option>
                            <option value="Washer">Washer</option>
                            <option value="Dryer">Dryer</option>
                            <option value="Refrigerator">Refrigerator</option>
                            <option value="Stove/Oven">Stove/Oven</option>
                            <option value="Microwave">Microwave</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter manufacturer..."
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formModelNumber">
                        <Form.Label>Model Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter model number..."
                            value={modelNumber}
                            onChange={(e) => setModelNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSerialNumber">
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter serial number..."
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formYearPurchased">
                        <Form.Label>Year Purchased</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter year purchased..."
                            value={yearPurchased}
                            onChange={(e) => setYearPurchased(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPurchasePrice">
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter purchase price..."
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
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