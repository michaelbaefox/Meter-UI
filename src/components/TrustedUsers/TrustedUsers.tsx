import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  Badge,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Mock data - in a real app this would come from a backend
const mockUsers = [
  { id: 'did:ethr:0x1234...5678', name: 'Alice Johnson', lastActive: '2 hours ago', isOnline: true },
  { id: 'did:ethr:0x8765...4321', name: 'Bob Smith', lastActive: '5 minutes ago', isOnline: true },
  { id: 'did:ethr:0x9876...1234', name: 'Carol White', lastActive: 'Just now', isOnline: false },
];

const TrustedUsers: React.FC = () => {
  const theme = useTheme();

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
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Trusted Users
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              px: 1,
              py: 0.5,
              borderRadius: 'pill',
              fontSize: '0.75rem',
              minWidth: '24px',
              textAlign: 'center',
            }}
          >
            {mockUsers.length}
          </Typography>
        </Box>
        <Tooltip title="Add Trusted User">
          <IconButton 
            color="primary"
            size="small"
            sx={{ 
              bgcolor: theme.palette.action.hover,
              '&:hover': { 
                transform: 'scale(1.1)',
                bgcolor: theme.palette.action.selected,
              }
            }}
          >
            <PersonAddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <List sx={{ 
        maxHeight: 400, 
        overflow: 'auto',
        px: 2,
        py: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
          borderRadius: '3px',
          '&:hover': {
            background: theme.palette.primary.dark,
          },
        },
      }}>
        {mockUsers.map((user, index) => (
          <React.Fragment key={user.id}>
            <ListItem
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 2,
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
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: user.isOnline ? theme.palette.success.main : theme.palette.action.disabled,
                      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      transition: 'all 0.2s ease-in-out',
                      width: 36,
                      height: 36,
                      fontSize: '1rem',
                      fontWeight: 500,
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    {user.name[0]}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    {user.name}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontFamily: 'monospace',
                        bgcolor: theme.palette.action.hover,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        width: 'fit-content',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {user.id}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      Last active: {user.lastActive}
                    </Typography>
                  </Box>
                }
              />
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                alignItems: 'center',
                ml: 2,
              }}>
                {user.isOnline && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.success.main,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 14 }} />
                    Online
                  </Typography>
                )}
                <Tooltip title="Remove User">
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    size="small"
                    sx={{
                      color: theme.palette.error.main,
                      opacity: 0.7,
                      '&:hover': {
                        opacity: 1,
                        transform: 'scale(1.1)',
                        bgcolor: theme.palette.error.main + '10',
                      }
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
            {index < mockUsers.length - 1 && (
              <Divider 
                variant="middle" 
                sx={{ 
                  my: 1,
                  opacity: 0.5,
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </List>

      {mockUsers.length === 0 && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 3,
          gap: 2,
        }}>
          <PersonAddIcon 
            sx={{ 
              fontSize: 48,
              color: theme.palette.text.secondary,
              opacity: 0.5,
            }} 
          />
          <Typography 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            No trusted users yet
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TrustedUsers; 