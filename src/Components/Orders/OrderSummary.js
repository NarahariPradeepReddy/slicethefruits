import React from 'react';
import { Card, CardContent, Typography, Grid2, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function OrderSummary({ cartItems }) {
  const navigate = useNavigate();

  const handleBackToProducts = () => {
    navigate('/products');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <Card sx={{ maxWidth: 800, m: 2, bgcolor: '#4eff6dcc', marginLeft: '250px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ fontWeight: 600 }}>
          Your Order Summary
        </Typography>
        {cartItems && cartItems.length > 0 ? (
          <>
            <Grid2 container spacing={2} alignItems="center">
              <Grid2 item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }} align="left">
                  Products
                </Typography>
              </Grid2>
              <Grid2 item xs={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }} align="left">
                  Quantity
                </Typography>
              </Grid2>
              <Grid2 item xs={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }} align="left">
                  Price
                </Typography>
              </Grid2>
            </Grid2>
            {cartItems.map((item, index) => (
              <Grid2 key={index} container spacing={2} alignItems="center">
                <Grid2 item xs={6}>
                  <Typography variant="body1" align="left">
                    {item.product.name}
                  </Typography>
                </Grid2>
                <Grid2 item xs={3}>
                  <Typography variant="body1">{item.quantity}</Typography>
                </Grid2>
                <Grid2 item xs={3}>
                  <Typography variant="body1">₹{item.product.price * item.quantity}</Typography>
                </Grid2>
              </Grid2>
            ))}
            <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Grid2 item xs={7}>
                <Typography variant="h6" align="right">
                  Total:
                </Typography>
              </Grid2>
              <Grid2 item xs={3}>
                <Typography variant="h6" align="right">
                  ₹{calculateTotalPrice()}
                </Typography>
              </Grid2>
            </Grid2>
          </>
        ) : (
          <Typography variant="body1" align='center'>Your cart is empty.</Typography>
        )}
        <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'space-evenly' }}>
          <Button variant="contained" color="primary" onClick={handleBackToProducts}>
            Continue Shopping
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
