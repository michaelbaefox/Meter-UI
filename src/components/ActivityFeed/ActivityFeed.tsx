import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
} from '@mui/icons-material';
import { useMeterContext } from '../../context/MeterContext';

const ActivityFeed: React.FC = () => {
  const theme = useTheme();
  const { history } = useMeterContext();

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getChangeIcon = (currentValue: number, prevValue: number | undefined) => {
    if (!prevValue) return <TrendingFlatIcon />;
    if (currentValue > prevValue) {
      return <TrendingUpIcon color="success" />;
    } else if (currentValue < prevValue) {
      return <TrendingDownIcon color="error" />;
    }
    return <TrendingFlatIcon color="action" />;
  };

  const getChangeDescription = (currentValue: number, prevValue: number | undefined) => {
    if (!prevValue) return 'Initial value';
    const change = currentValue - prevValue;
    const changeAbs = Math.abs(change);
    if (change > 0) {
      return `Increased by ${changeAbs.toFixed(1)}%`;
    } else if (change < 0) {
      return `Decreased by ${changeAbs.toFixed(1)}%`;
    }
    return 'No change';
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 3,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)',
      }
    }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Activity Feed
      </Typography>

      {history.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No activity yet
        </Typography>
      ) : (
        <List sx={{ 
          maxHeight: 400, 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.action.hover,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '4px',
            '&:hover': {
              background: theme.palette.primary.dark,
            },
          },
        }}>
          {[...history].reverse().map((update, index, array) => {
            const prevValue = array[index + 1]?.value;
            return (
              <ListItem
                key={update.timestamp}
                sx={{
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
                    bgcolor: 'action.hover',
                    transform: 'translateX(4px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getChangeIcon(update.value, prevValue)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">
                        {getChangeDescription(update.value, prevValue)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {update.value.toFixed(1)}%
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        User {update.userId}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimestamp(update.timestamp)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Paper>
  );
};

export default ActivityFeed; 