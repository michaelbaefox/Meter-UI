import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Notifications } from '@mui/icons-material';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
          Meter UI
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="primary"
          >
            <Notifications />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 