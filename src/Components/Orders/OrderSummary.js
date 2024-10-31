import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};

  const handleBackToOrders = () => {
    navigate('/order-tracking');
  };

  if (!order) {
    return <Typography variant="h6">No order details available.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        bgcolor: '#f0f0f0',
        padding: 2,
        overflow: 'auto',
      }}
    >
      <Card sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' }, m: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ fontWeight: 600 }}>
            Order Details
          </Typography>
          <Typography variant="h6">Order ID: {order.id}</Typography>
          <Typography variant="body1">Status: {order.status}</Typography>
          <Typography variant="body1">Ordered on: {order.date}</Typography>
          

          {/* Order Tracking Details */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Tracking Details:
          </Typography>
          <Box sx={{ marginY: 2 }}>
            <Typography variant="body1"><strong>Ordered:</strong> {order.date}</Typography>
            <Typography variant="body1"><strong>Ready for Packing:</strong> {order.readyForPacking ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1"><strong>Shipped:</strong> {order.shipped ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1"><strong>Out for Delivery:</strong> {order.outForDelivery ? 'Yes' : 'No'}</Typography>

            {!order.delivered ? (
              <>
                <Typography variant="body1"><strong>Estimated Delivery Date:</strong> {order.estimatedDelivery || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Current Location:</strong> {order.location || 'Location not available'}</Typography>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ color: 'gray' }}>
                  <strong>Estimated Delivery Date:</strong> Delivery complete.
                </Typography>
                <Typography variant="body1" sx={{ color: 'gray' }}>
                  <strong>Current Location:</strong> Location not available.
                </Typography>
              </>
            )}
            
            <Typography variant="body1"><strong>Delivered:</strong> {order.delivered ? 'Yes' : 'No'}</Typography>
          </Box>

          <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleBackToOrders}>
              Back to Orders
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;