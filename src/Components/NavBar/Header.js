import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Toolbar, Button, Box, Avatar, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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
      <Toolbar>
        <Button variant="h6" component={Link} to="/slicethefruits" sx={{ flexGrow: 1, color: "#ffff" }}>
          SlicetheFruits
        </Button>
        <TextField
          label="Search for products and more"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          InputLabelProps={{
            shrink: searchQuery.length > 0,
          }}
          sx={{
            bgcolor: "#ffff",
            width: { xs: "50vh", sm: "60vh", md: "80vh" },
            borderRadius: "8px",
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/slicethefruits">Products</Button>
          <Button color="inherit" component={Link} to="/cart">Cart</Button>
          <Button color="inherit" component={Link} to="/order-tracking">Orders</Button>
          {user ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                aria-label="User profile menu"
              >
                <Avatar alt={user.email} src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
      {searchResults.length > 0 && (
        <Box sx={{ p: 2, bgcolor: '#ffffff', color: 'black', borderRadius: '8px', mt: 1 }}>
          <Typography variant="h6">Search Results:</Typography>
          <ul>
            {searchResults.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </Box>
      )}
    </AppBar>
  );
}
