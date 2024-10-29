import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      address,
      status: 'Order Placed',
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.setItem('cart', JSON.stringify([])); // Empty the cart
    navigate('/order-tracking');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input
        type="text"
        placeholder="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;
