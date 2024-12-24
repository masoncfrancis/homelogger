import {useState} from 'react';
import {Container} from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import BlankCard from '../components/BlankCard';
import AddApplianceModal from '../components/AddApplianceModal';

const AppliancesPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleAddCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveAppliance = (makeModel: string, yearPurchased: string, purchasePrice: string, location: string, type: string) => {
        // Logic to save the new appliance
        console.log('Appliance saved:', {makeModel, yearPurchased, purchasePrice, location, type});
    };

    return (
        <Container>
            <MyNavbar/>
            <p id='maintext'>Welcome to the appliances page.</p>
            <BlankCard onClick={handleAddCardClick}/>
            <AddApplianceModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSaveAppliance}
            />
        </Container>
    );
};

export default AppliancesPage;