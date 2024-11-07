import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import Homepage from '../Homepage/Homepage';
import Cart from '../Cart/Cart';
import Checkout from '../Cart/Checkout';
import OrderTracking from '../Orders/OrderTracking'; // Corrected path
import OrderSummary from '../Orders/OrderSummary';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/slicethefruits" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>
  );
}
