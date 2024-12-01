import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress, 
  useTheme,
  Alert,
  Chip,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useMeterContext } from '../../context/MeterContext';

const MeterDisplay: React.FC = () => {
  const theme = useTheme();
  const { currentValue, analytics, error } = useMeterContext();

  // Color calculation based on value
  const getColor = (value: number) => {
    if (value < 30) return theme.palette.error.main;
    if (value < 70) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getTrendIcon = () => {
    switch (analytics.trend) {
      case 'up':
        return <TrendingUp sx={{ fontSize: 16 }} />;
      case 'down':
        return <TrendingDown sx={{ fontSize: 16 }} />;
      default:
        return <TrendingFlat sx={{ fontSize: 16 }} />;
    }
  };

  const getTrendColor = () => {
    switch (analytics.trend) {
      case 'up':
        return theme.palette.success.main;
      case 'down':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 4, 
      textAlign: 'center',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)',
      }
    }}>
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          icon={<WarningIcon />}
        >
          {error}
        </Alert>
      )}

      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'medium',
          color: getColor(currentValue),
          opacity: 0,
          animation: 'fadeIn 0.5s ease-in-out forwards',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-10px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        Current Meter Value
      </Typography>
      
      <Box sx={{ 
        position: 'relative', 
        display: 'inline-flex',
        my: 4,
        animation: 'scaleIn 0.5s ease-in-out',
        '@keyframes scaleIn': {
          from: { transform: 'scale(0.8)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 }
        }
      }}>
        <CircularProgress
          variant="determinate"
          value={currentValue}
          size={200}
          thickness={4}
          sx={{
            transition: 'all 0.8s ease-in-out',
            circle: {
              strokeLinecap: 'round',
              transition: 'all 0.8s ease-in-out',
              stroke: getColor(currentValue),
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography 
            variant="h3" 
            component="div" 
            sx={{
              color: getColor(currentValue),
              transition: 'all 0.3s ease-in-out',
              animation: 'slideUp 0.5s ease-in-out',
              '@keyframes slideUp': {
                from: { transform: 'translateY(20px)', opacity: 0 },
                to: { transform: 'translateY(0)', opacity: 1 }
              }
            }}
          >
            {Math.round(currentValue)}%
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ opacity: 0.7 }}
          >
            {currentValue < 30 ? 'Low' : currentValue < 70 ? 'Moderate' : 'High'}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Tooltip title="Current Trend">
              <Chip
                icon={getTrendIcon()}
                label={`Trend: ${analytics.trend.charAt(0).toUpperCase() + analytics.trend.slice(1)}`}
                sx={{ 
                  color: getTrendColor(),
                  borderColor: getTrendColor(),
                  '& .MuiChip-icon': {
                    color: getTrendColor(),
                  }
                }}
                variant="outlined"
              />
            </Tooltip>
            <Tooltip title="Change Rate (units per minute)">
              <Chip
                icon={<SpeedIcon sx={{ fontSize: 16 }} />}
                label={`${analytics.changeRate} units/min`}
                variant="outlined"
                color="primary"
              />
            </Tooltip>
            <Tooltip title="Statistics">
              <Chip
                icon={<AnalyticsIcon sx={{ fontSize: 16 }} />}
                label={`Avg: ${analytics.average}% | Min: ${analytics.min}% | Max: ${analytics.max}%`}
                variant="outlined"
                color="secondary"
              />
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mt: 3,
          opacity: 0,
          animation: 'fadeIn 0.5s ease-in-out forwards 0.3s',
        }}
      >
        Last updated: {new Date().toLocaleTimeString()}
      </Typography>
    </Paper>
  );
};

export default MeterDisplay; 