import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import Header from './Components/NavBar/Header';
import Footer from './Components/NavBar/Footer';

function AppWrapper() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default AppWrapper;
