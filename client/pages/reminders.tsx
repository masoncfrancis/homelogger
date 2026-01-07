"use client";

import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import NextUp from '../components/NextUp';
import AddReminderModal from '../components/AddReminderModal';

const RemindersPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <MyNavbar />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Reminders</h2>
        <Button onClick={() => setShowModal(true)}>Add Reminder</Button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <NextUp />
      </div>
      <AddReminderModal show={showModal} handleClose={() => setShowModal(false)} />
    </Container>
  );
};

export default RemindersPage;
