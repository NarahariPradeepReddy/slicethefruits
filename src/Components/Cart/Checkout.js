import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

function Checkout() {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default to UPI
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false); // Option to save card details
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Handle UPI redirection
    if (paymentMethod !== 'Credit/Debit Card') {
      const selectedUPI = paymentMethod; // Get the selected UPI method
      redirectToUPIApp(selectedUPI);
      return; // Exit early to avoid saving the order
    }

    // Save order details in localStorage
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      address,
      name,
      phone,
      paymentMethod,
      status: 'Order Placed',
      cardNumber: saveCard ? cardNumber : undefined, // Save card number if user chooses
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.setItem('cart', JSON.stringify([])); // Empty the cart
    navigate('/order-tracking');
  };

  const redirectToUPIApp = (upiMethod) => {
    let upiUrl = '';
    switch (upiMethod) {
      case 'Google Pay':
        upiUrl = 'upi://pay?pa=example@okaxis&pn=Example+Name&mc=1234&tid=1234567890&am=1.00&cu=INR&url=https://example.com';
        break;
      case 'PhonePe':
        upiUrl = 'upi://pay?pa=example@ppbl&pn=Example+Name&mc=1234&tid=1234567890&am=1.00&cu=INR&url=https://example.com';
        break;
      case 'Paytm':
        upiUrl = 'upi://pay?pa=example@paytm&pn=Example+Name&mc=1234&tid=1234567890&am=1.00&cu=INR&url=https://example.com';
        break;
      default:
        return;
    }
    window.location.href = upiUrl; // Redirect to UPI app
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shipping Address"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Select a payment method</Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                // Clear card details if switching to UPI
                if (e.target.value === 'Credit/Debit Card') {
                  setCardNumber('');
                  setCardExpiry('');
                  setCardCvc('');
                }
              }}
            >
              <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              <Box ml={4}>
                <FormControlLabel
                  value="Google Pay"
                  control={<Radio />}
                  label="Google Pay"
                />
                <FormControlLabel
                  value="PhonePe"
                  control={<Radio />}
                  label="PhonePe"
                />
                <FormControlLabel
                  value="Paytm"
                  control={<Radio />}
                  label="Paytm"
                />
              </Box>
              <FormControlLabel
                value="Credit/Debit Card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              {paymentMethod === 'Credit/Debit Card' && (
                <Box ml={4}>
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                  <TextField
                    label="Expiry Date (MM/YY)"
                    variant="outlined"
                    fullWidth
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                  />
                  <TextField
                    label="CVC"
                    variant="outlined"
                    fullWidth
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                  />
                  <FormControlLabel
                    control={<Radio checked={saveCard} onChange={() => setSaveCard(!saveCard)} />}
                    label="Save card for future use"
                  />
                </Box>
              )}
              <FormControlLabel
                value="Cash on Delivery"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Checkout;
