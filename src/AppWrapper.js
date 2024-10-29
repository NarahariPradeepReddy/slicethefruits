import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import Layout from './Components/Layout'; 

function AppWrapper() {
  return (
    <Router>
        <AppRoutes />
    </Router>
  );
}

export default AppWrapper;
