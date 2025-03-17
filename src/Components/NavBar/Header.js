import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Toolbar, Button, Box, Avatar, IconButton, Menu, MenuItem, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/logo.jpg';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const productData = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
    { id: 4, name: 'Mango' }
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query !== '') {
      const filteredResults = productData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'green', borderRadius: '8px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component={Link} to="/slicethefruits" sx={{ color: "#ffffff", textDecoration: 'none' }}>
            SlicetheFruits
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ position: 'relative' }}>
          <TextField
            label="Search for products and more"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            InputLabelProps={{
              shrink: searchQuery.length > 0,
            }}
            sx={{
              bgcolor: "#ffffff",
              width: { xs: "50vh", sm: "60vh", md: "80vh" },
              borderRadius: "8px",
            }}
          />
          {searchResults.length > 0 && (
            <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, mt: 1 }}>
              <List>
                {searchResults.map((item) => (
                  <ListItem key={item.id} button>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/slicethefruits">Products</Button>
          <Button color="inherit" component={Link} to="/cart">Cart</Button>
          <Button color="inherit" component={Link} to="/order-tracking">Orders</Button>

          {/* User Profile Dropdown */}
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen} aria-label="User profile menu">
                <Avatar alt={user.email} src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
