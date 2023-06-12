import type { AuthenticationType } from 'types/index';
import React, { createContext, useReducer } from 'react';

const initialState: AuthenticationType = {
  isAuthenticated: false,
  user: null,
  token: null
};

export const AuthContext = createContext<{
  state: AuthenticationType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});
