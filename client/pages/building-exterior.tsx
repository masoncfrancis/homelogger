import React from 'react';
import {Container, Tab, Tabs, Card} from 'react-bootstrap';
import MaintenanceSection, {MaintenanceReferenceType, MaintenanceSpaceType} from '@/components/MaintenanceSection';
import RepairSection, {RepairReferenceType, RepairSpaceType} from '@/components/RepairSection';
import DocumentationSection from '@/components/DocumentationSection';

const BuildingExteriorPage: React.FC = () => {
    return (
        <Container style={{marginTop: '16px'}}>
            <h3>Building Exterior</h3>
            <Tabs defaultActiveKey="maintenance" id="building-exterior-tabs" className="mb-3">
                <Tab eventKey="maintenance" title="Maintenance">
                    <MaintenanceSection referenceType={MaintenanceReferenceType.Space} spaceType={MaintenanceSpaceType.BuildingExterior} />
                </Tab>
                <Tab eventKey="repair" title="Repairs">
                    <RepairSection referenceType={RepairReferenceType.Space} spaceType={RepairSpaceType.BuildingExterior} />
                </Tab>
                <Tab eventKey="documents" title="Documents">
                    <DocumentationSection spaceType={MaintenanceSpaceType.BuildingExterior} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default BuildingExteriorPage;
