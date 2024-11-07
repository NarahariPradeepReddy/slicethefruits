import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/slicethefruits');
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', padding: 3 }}>Your Cart</Typography>

      {cart.length === 0 ? (
        <Box textAlign='center' mt={4} >
        <Typography variant="body1" color="textPrimary" padding= {2}>Your cart is empty</Typography>
        <Button
        onClick={handleContinueShopping}
        variant="outlined"
        color="secondary"
        size="large"
      >
        Continue Shopping
      </Button>
      </Box>
      ) : (
        <Box>
          <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize:'18px', }}><strong>Product Name</strong></TableCell>
                  <TableCell align="center" sx={{ fontSize:'18px', }}><strong>Quantity</strong></TableCell>
                  <TableCell align="center" sx={{ fontSize:'18px', }}><strong>Price</strong></TableCell>
                  <TableCell align="center" sx={{ fontSize:'18px', }}><strong>Total Price</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ fontSize:'18px',}}>{item.name}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => decrementQuantity(item.id)} color="primary">
                        <Remove />
                      </IconButton>
                      <Typography component="span" variant="body1" mx={1}>{item.quantity}</Typography>
                      <IconButton onClick={() => incrementQuantity(item.id)} color="primary">
                        <Add />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize:'18px', }}>₹{item.price.toFixed(2)}</TableCell>
                    <TableCell align="center" sx={{ fontSize:'18px', }}>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right" sx={{ fontSize:'18px', }}><strong>Grand Total:</strong></TableCell>
                  <TableCell align="center" sx={{ fontSize:'20px', }}><strong>₹{getTotalPrice().toFixed(2)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              disabled={cart.length === 0}
              size="large"
            >
              Proceed to Checkout
            </Button>
            <Button
              onClick={handleContinueShopping}
              variant="outlined"
              color="secondary"
              size="large"
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Cart;
