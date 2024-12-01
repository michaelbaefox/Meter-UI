import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const THEME_STORAGE_KEY = 'meterui-theme-preference';

// Define color palettes
const lightPalette = {
  primary: {
    main: '#2563eb', // Bright blue
    light: '#60a5fa',
    dark: '#1d4ed8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#4f46e5', // Indigo
    light: '#818cf8',
    dark: '#3730a3',
    contrastText: '#ffffff',
  },
  error: {
    main: '#dc2626', // Red
    light: '#ef4444',
    dark: '#b91c1c',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#000000',
  },
  success: {
    main: '#059669', // Emerald
    light: '#34d399',
    dark: '#047857',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8fafc', // Slate 50
    paper: '#ffffff',
    secondary: '#f1f5f9', // Slate 100
  },
  text: {
    primary: '#0f172a', // Slate 900
    secondary: '#475569', // Slate 600
  },
};

const darkPalette = {
  primary: {
    main: '#3b82f6', // Blue
    light: '#60a5fa',
    dark: '#2563eb',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#6366f1', // Indigo
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  error: {
    main: '#ef4444', // Red
    light: '#f87171',
    dark: '#dc2626',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#000000',
  },
  success: {
    main: '#10b981', // Emerald
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
  },
  background: {
    default: '#0f172a', // Slate 900
    paper: '#1e293b', // Slate 800
    secondary: '#334155', // Slate 700
  },
  text: {
    primary: '#f8fafc', // Slate 50
    secondary: '#cbd5e1', // Slate 300
  },
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.body.style.transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out';
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      ...(isDarkMode ? darkPalette : lightPalette),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '@global': {
            body: {
              transition: 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: isDarkMode ? darkPalette.background.default : lightPalette.background.default,
              color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: isTransitioning ? 'transparent' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.24)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        defaultProps: {
          elevation: 0,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
          contained: {
            boxShadow: isDarkMode
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.24)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          track: {
            borderRadius: 22 / 2,
            opacity: 1,
            backgroundColor: isDarkMode ? darkPalette.background.secondary : lightPalette.background.secondary,
          },
          thumb: {
            backgroundColor: isDarkMode ? darkPalette.primary.main : lightPalette.primary.main,
          },
        },
      },
    },
  });

  const toggleDarkMode = useCallback(() => {
    setIsTransitioning(true);
    setIsDarkMode(prev => !prev);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 