import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './NavBar/Header'; 
import Footer from './NavBar/Footer'; 

const Layout = ({ children }) => {
  const location = useLocation();

  const showHeaderFooter = !['/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {showHeaderFooter && <Header />}
      <main>{children}</main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
