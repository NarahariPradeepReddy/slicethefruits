import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import ProductsList from '../Products/ProductsList'
// import ProductDetails from './Components/Products/ProductDetails';
// import OrderSummary from './Components/Orders/OrderSummary';
// import OrderTracking from './Components/Orders/OrderTracking';
import Cart from '../Cart/Cart';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/products" element={<ProductsList />} />
      {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/order-summary" element={<OrderSummary />} /> */}
      {/* <Route path="/order-tracking/:id" element={<OrderTracking />} /> */}
      <Route path="/" element={<ProductsList />} />
    </Routes>
  );
};

export default AppRoutes;
