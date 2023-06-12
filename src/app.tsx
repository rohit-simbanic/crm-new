import React, { useReducer } from 'react';
import './app.css';
import Router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import authReducer from 'hooks/auth/auth-reducer';
import { AuthContext } from 'hooks/auth/auth-context';
import ListenStorageEvent from 'listeners/storage-event';
import type { AuthenticationType } from 'types/index';
import MuiSnackBar from 'components/snackbar';
import moment from 'moment-timezone';
import DateUtility from 'helpers/date-helper';
import { ErrorBoundary, Provider } from '@rollbar/react';
import envConfig from 'config/env';

const initialState: AuthenticationType = {
  isAuthenticated: false,
  user: null,
  token: null
};

function App() {
  const { theme, colorMode } = useMode();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const rollbarConfig = {
    accessToken: envConfig.REACT_APP_ROLLBAR_TOKEN,
    environment: envConfig.REACT_APP_BROKERAGE_ENV
  };

  moment.tz.setDefault(DateUtility.getCurrentTimeZone());
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <AuthContext.Provider
                  value={{
                    state,
                    dispatch
                  }}
                >
                  <MuiSnackBar />
                  <ListenStorageEvent />
                  <RouterProvider router={Router} />
                </AuthContext.Provider>
              </LocalizationProvider>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
