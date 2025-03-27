import {Button, Modal, Form} from 'react-bootstrap';
import {RepairRecord} from './RepairSection';
import {SERVER_URL} from "@/pages/_app";

interface ShowRepairModalProps {
    show: boolean;
    handleClose: () => void;
    repairRecord: RepairRecord;
    handleDeleteRepair: (id: number) => void;
}

const ShowRepairModal: React.FC<ShowRepairModalProps> = ({show, handleClose, repairRecord, handleDeleteRepair}) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                const response = await fetch(`${SERVER_URL}/repair/delete/${repairRecord.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete repair record');
                }

                console.log('Record deleted');
                handleDeleteRepair(repairRecord.id);
                handleClose();
            } catch (error) {
                console.error('Error deleting repair record:', error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Repair Record Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Description:</strong> {repairRecord.description}</p>
                <p><strong>Date:</strong> {repairRecord.date}</p>
                <p><strong>Cost:</strong> ${repairRecord.cost}</p>
                <Form.Group>
                    <Form.Label><strong>Notes:</strong></Form.Label>
                    <div className='form-control'>
                        {repairRecord.notes}
                    </div>
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
        </Modal>
    );
};

export default ShowRepairModal;