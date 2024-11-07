import React, { useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainImg from "../Assets/mainpage.jpg";
import Apple from "../Assets/Products/Apple.jpeg";
import Pineapple from "../Assets/Products/Pineapple.jpg";
import Orange from "../Assets/Products/Orange.jpg";
import Papaya from "../Assets/Products/papaya.jpeg";
import Grapes from "../Assets/Products/Grapes.jpeg";
import SlicedApple from "../Assets/Products/SlicedApple.jpg";
import SlicedPineapple from "../Assets/Products/SlicedPineapple.jpeg";
import SlicedOrange from "../Assets/Products/SlicedOrange.jpeg";
import Bananas from "../Assets/Products/Bananas.jpeg";
import BlackGrapes from "../Assets/Products/BlackGrapes.jpg";

const productData = [
  { id: 1, name: "Apple", price: 150, image: Apple },
  { id: 2, name: "Pineapple", price: 100, image: Pineapple },
  { id: 3, name: "Orange", price: 100, image: Orange },
  { id: 4, name: "Papaya", price: 120, image: Papaya },
  { id: 5, name: "Grapes", price: 80, image: Grapes },
  { id: 6, name: "Sliced Apple", price: 150, image: SlicedApple },
  { id: 7, name: "Sliced Pineapple", price: 100, image: SlicedPineapple },
  { id: 8, name: "Sliced Orange", price: 100, image: SlicedOrange },
  { id: 9, name: "Bananas", price: 120, image: Bananas },
  { id: 10, name: "Black Grapes", price: 80, image: BlackGrapes },
];

function Homepage() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  
  const addToCart = (product) => {
    const newCart = [...cart, { ...product, quantity: 1, date: new Date().toLocaleString() }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setSnackbarMessage(`${product.name} added to cart!`);
    setOpenSnackbar(true);
};


  const handleCheckouttoCart = () => {
    if (cart.length === 0) {
      setSnackbarMessage("Your cart is empty!");
      setOpenSnackbar(true);
    } else {
      navigate("/cart");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const isInCart = (productId) => cart.find((item) => item.id === productId);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        padding: 3,
        margin: 0,
        backgroundImage: `url(${MainImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {productData.map((product) => {
            const cartItem = isInCart(product.id);
            return (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  elevation={3}
                  style={{ transition: "0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 140, objectFit: "contain", padding: 0.5 }}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent style={{ padding: "16px" }}>
                    <Typography variant="h6" style={{ color: "#000" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1">₹{product.price}</Typography>
                    {cartItem ? (
                      <Box display="flex" alignItems="center" mt={2}>
                        <IconButton
                          onClick={() => decrementQuantity(product.id)}
                          color="primary"
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" mx={1}>
                          {cartItem.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => incrementQuantity(product.id)}
                          color="primary"
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addToCart(product)}
                        style={{ marginTop: "8px" }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Button
            onClick={handleCheckouttoCart}
            variant="contained"
            color="primary"
            size="large"
          >
            Checkout to cart
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        />
      </Box>
    </Box>
  );
}

export default Homepage;
