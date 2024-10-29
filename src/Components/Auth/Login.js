import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Link,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
// import Loginimg from "../Assets/login.jpg";
import LgImg from '../Assets/lgBgimg.jpeg'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        maxWidth: "100%",
        position: "relative",
        backgroundImage: `url(${LgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
        }}
      />
      <Paper
        elevation={6}
        sx={{
          padding: '2rem',
          borderRadius: '10px',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(92, 158, 158, 0.6)', 
        }}
      >
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ color: "#75f504", textAlign: "center", marginBottom: "1rem" }}
        >
          <LockOutlinedIcon />
          <Typography variant="h5" component="h1" sx={{ marginTop: "0.5rem" }}>
            Login
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
                inputLabel: { sx: { color: "#fff" } },
                input: { sx: { color: "#fff" } }, 
              }} 
            style={{ marginBottom: "1rem" }} 
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
                inputLabel: { sx: { color: "#fff" } }, 
                input: { sx: { color: "#fff" } },
              }} 
            style={{ marginBottom: "1rem" }} 
          />
           <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Typography variant="body2" color="#ffff">
              Don't have an account?
            </Typography>
            <Link
              href="/signup"
              variant="body2"
              sx={{
                color: "#75f504",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign up
            </Link>
          </Box>
          <Button
            variant="contained"
            onClick={handleLogin}
            style={{ marginTop: "1rem", backgroundColor: '#75f504',
                color: '#ffff', 
                fontWeight: 600, 
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
