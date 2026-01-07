"use client";

import React from 'react';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import NextUp from '../components/NextUp';

const NextUpPage: React.FC = () => {
  return (
    <Container>
      <MyNavbar />
      <div style={{marginTop: '1rem'}}>
        <NextUp />
      </div>
    </Container>
  );
};

export default NextUpPage;
