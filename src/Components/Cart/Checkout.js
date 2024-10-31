import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Paper,
  Grid,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

function Checkout() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(""); // Error state for phone number
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiOption, setUpiOption] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const validatePhoneNumber = () => {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      setSnackbarMessage("Please fill in all required fields.");
      setOpenSnackbar(true);
      return;
    }

    if (!validatePhoneNumber()) {
      setSnackbarMessage("Please enter a valid 10-digit phone number.");
      setOpenSnackbar(true);
      return;
    }

    if (!paymentMethod) {
      setSnackbarMessage("Please select a payment method.");
      setOpenSnackbar(true);
      return;
    }

    if (paymentMethod === "UPI" && !upiOption) {
      setSnackbarMessage("Please select a UPI method.");
      setOpenSnackbar(true);
      return;
    }
    if (
      paymentMethod === "Credit/Debit Card" &&
      (!cardNumber || !cardExpiry || !cardCvc)
    ) {
      setSnackbarMessage("Please fill in all card details.");
      setOpenSnackbar(true);
      return;
    }

    const order = {
      id: Math.random().toString(36).substr(2, 9),
      address,
      name,
      phone,
      paymentMethod: upiOption || paymentMethod,
      status: "Order Placed",
      cardNumber: saveCard ? cardNumber : undefined,
      date: new Date().toLocaleString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", JSON.stringify([]));
    setSnackbarMessage("Order placed successfully!");
    setOpenSnackbar(true);
    navigate("/order-tracking");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
              error={!!phoneError}
              helperText={phoneError}
              onBlur={validatePhoneNumber} // Validate when the field loses focus
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
                if (e.target.value !== "Credit/Debit Card") {
                  setCardNumber("");
                  setCardExpiry("");
                  setCardCvc("");
                }
                if (e.target.value !== "UPI") {
                  setUpiOption("");
                }
              }}
            >
              <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              {paymentMethod === "UPI" && (
                <Box ml={4}>
                  <FormControlLabel
                    value="Google Pay"
                    control={
                      <Radio
                        checked={upiOption === "Google Pay"}
                        onChange={(e) => setUpiOption(e.target.value)}
                      />
                    }
                    label="Google Pay"
                  />
                  <FormControlLabel
                    value="PhonePe"
                    control={
                      <Radio
                        checked={upiOption === "PhonePe"}
                        onChange={(e) => setUpiOption(e.target.value)}
                      />
                    }
                    label="PhonePe"
                  />
                  <FormControlLabel
                    value="Paytm"
                    control={
                      <Radio
                        checked={upiOption === "Paytm"}
                        onChange={(e) => setUpiOption(e.target.value)}
                      />
                    }
                    label="Paytm"
                  />
                </Box>
              )}
              <FormControlLabel
                value="Credit/Debit Card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              {paymentMethod === "Credit/Debit Card" && (
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
                    control={
                      <Radio
                        checked={saveCard}
                        onChange={() => setSaveCard(!saveCard)}
                      />
                    }
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
}

export default Checkout;
