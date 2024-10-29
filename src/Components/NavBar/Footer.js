import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'green', color: '#fff', p: 2, textAlign: 'center', marginTop: 2, }}>
      <Typography variant="body1">© 2024 SlicetheFruits. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
