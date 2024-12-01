import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Slider, 
  Button, 
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useMeterContext } from '../../context/MeterContext';

const AdjustMeter: React.FC = () => {
  const { currentValue, adjustMeter, setIsAdjusting } = useMeterContext();
  const [adjustment, setAdjustment] = useState(0);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setAdjustment(Number(newValue));
  };

  const handleQuickAdjust = (amount: number) => {
    setIsAdjusting(true);
    adjustMeter(amount);
    setTimeout(() => setIsAdjusting(false), 500);
  };

  const handleApplyAdjustment = () => {
    setIsAdjusting(true);
    adjustMeter(adjustment);
    setAdjustment(0);
    setTimeout(() => setIsAdjusting(false), 500);
  };

  const handleReset = () => {
    setIsAdjusting(true);
    adjustMeter(50 - currentValue);
    setAdjustment(0);
    setTimeout(() => setIsAdjusting(false), 500);
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
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Adjust Meter
      </Typography>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Decrease by 5">
            <IconButton 
              onClick={() => handleQuickAdjust(-5)}
              color="primary"
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>

          <Slider
            value={adjustment}
            onChange={handleSliderChange}
            min={-20}
            max={20}
            marks
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value > 0 ? '+' : ''}${value}%`}
            sx={{
              '& .MuiSlider-thumb': {
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              },
            }}
          />

          <Tooltip title="Increase by 5">
            <IconButton 
              onClick={() => handleQuickAdjust(5)}
              color="primary"
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button 
            variant="contained" 
            onClick={handleApplyAdjustment}
            disabled={adjustment === 0}
            sx={{ 
              flex: 1,
              transition: 'all 0.2s',
              '&:not(:disabled):hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            Apply Adjustment
          </Button>

          <Tooltip title="Reset to 50%">
            <IconButton 
              onClick={handleReset}
              color="primary"
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { transform: 'rotate(180deg)' }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AdjustMeter; 