import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  useTheme,
} from '@mui/material';
import { useThemeContext } from '../../theme/ThemeContext';

const Settings: React.FC = () => {
  const theme = useTheme();
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  const settings = [
    {
      title: 'Dark Mode',
      description: 'Toggle between light and dark theme',
      value: isDarkMode,
      onChange: toggleDarkMode,
    },
    {
      title: 'Notifications',
      description: 'Enable push notifications',
      value: true,
      onChange: () => {},
    },
    {
      title: 'Auto Updates',
      description: 'Automatically update meter values',
      value: true,
      onChange: () => {},
    },
  ];

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 0,
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ 
        p: 2.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
      </Box>

      <List sx={{ py: 0 }}>
        {settings.map((setting, index) => (
          <React.Fragment key={setting.title}>
            <ListItem
              sx={{
                py: 2,
                px: 2.5,
                opacity: 0,
                animation: 'slideIn 0.5s ease-in-out forwards',
                animationDelay: `${index * 0.1}s`,
                '@keyframes slideIn': {
                  from: { 
                    opacity: 0, 
                    transform: 'translateX(-20px)',
                  },
                  to: { 
                    opacity: 1, 
                    transform: 'translateX(0)',
                  },
                },
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    {setting.title}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      display: 'block',
                      pr: 8, // Prevent text from running under the switch
                    }}
                  >
                    {setting.description}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={setting.value}
                  onChange={setting.onChange}
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                        '& + .MuiSwitch-track': {
                          backgroundColor: theme.palette.primary.main,
                          opacity: 0.5,
                        },
                      },
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: theme.palette.action.selected,
                    },
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index < settings.length - 1 && (
              <Divider 
                variant="middle" 
                sx={{ 
                  opacity: 0.5,
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default Settings; 