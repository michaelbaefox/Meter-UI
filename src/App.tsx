import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MeterDisplay from './components/MeterDisplay/MeterDisplay';
import AdjustMeter from './components/AdjustMeter/AdjustMeter';
import TrustedUsers from './components/TrustedUsers/TrustedUsers';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';
import Settings from './components/Settings/Settings';
import { ThemeProvider } from './theme/ThemeContext';
import { MeterProvider } from './context/MeterContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MeterProvider>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          opacity: 0,
          animation: 'fadeIn 0.5s ease-in-out forwards',
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
              transform: 'translateY(10px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}>
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
            <Box sx={{ 
              display: 'grid', 
              gap: 3, 
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              '& > *': {
                opacity: 0,
                animation: 'slideIn 0.5s ease-in-out forwards',
                '@keyframes slideIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              },
              '& > *:nth-of-type(1)': { animationDelay: '0.1s' },
              '& > *:nth-of-type(2)': { animationDelay: '0.2s' },
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <MeterDisplay />
                <AdjustMeter />
                <ActivityFeed />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TrustedUsers />
                <Settings />
              </Box>
            </Box>
          </Container>
          <Footer />
        </Box>
      </MeterProvider>
    </ThemeProvider>
  );
};

export default App; 