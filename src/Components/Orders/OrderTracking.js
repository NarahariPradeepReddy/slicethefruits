import React, { useState, useEffect } from 'react';

function OrderTracking() {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);

  useEffect(() => {
    const updateOrderStatus = () => {
      const updatedOrders = orders.map((order) => {
        if (order.status === 'Order Placed') return { ...order, status: 'Shipped' };
        if (order.status === 'Shipped') return { ...order, status: 'Out for Delivery' };
        if (order.status === 'Out for Delivery') return { ...order, status: 'Delivered' };
        return order;
      });
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const timer = setTimeout(updateOrderStatus, 5000); // Simulate status updates every 5 seconds
    return () => clearTimeout(timer);
  }, [orders]);

  return (
    <div>
      <h2>Order Tracking</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order ID: {order.id} - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderTracking;
