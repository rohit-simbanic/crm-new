import { createTheme } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';

export const tokens = (mode: any) => ({
  ...(mode === 'dark'
    ? {
        white: {
          500: '#f6f6f8',
          800: '#e0e0e0',
          900: '#FFF'
        },
        black: {
          100: '#d6d6d6f8',
          400: '#FFFFFF',
          500: '#000000de'
        },
        grey: {
          400: '#858585',
          500: '#666666'
        },
        primary: {
          400: '#1f2A40',
          500: '#141b2d'
        },
        blue: {
          500: '#3a95c9',
          600: '#2d78a4'
        }
      }
    : {
        white: {
          500: '#f6f6f8',
          800: '#e0e0e0',
          900: '#FFF',
          shadow: 'rgb(0 0 0 / 10%)',
          input: 'rgba(0, 0, 0, 0.06)',
          hover: 'rgba(0, 0, 0, 0.09)'
        },
        black: {
          500: '#000000de'
        },

        grey: {
          400: '#525252',
          500: '#666666',
          900: '#444444',
          border: 'rgba(0, 0, 0, 0.12)'
        },
        primary: {
          400: '#f2f0f0',
          500: '#141b2d'
        },
        blue: {
          500: '#3a95c9',
          600: '#2d78a4'
        }
      })
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: '#eff1f6'
          }
        },
        typography: {
          fontSize: 14,
          fontFamily: ['Roboto', 'sans-serif'].join(','),
          button: {
            textTransform: 'none',
            fontWeight: 700
          }
        }
      }),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  return { theme, colorMode };
};
