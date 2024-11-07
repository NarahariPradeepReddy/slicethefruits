import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Homepage from './Components/Homepage/Homepage';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Cart/Checkout';
import OrderTracking from './Components/Orders/OrderTracking';
import Layout from './Components/Layout';
import OrderSummary from './Components/Orders/OrderSummary';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </Layout>
  );
}

export default App;
