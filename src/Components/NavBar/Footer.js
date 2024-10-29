import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', p: 2, mt: 5 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          SlicetheFruits
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
