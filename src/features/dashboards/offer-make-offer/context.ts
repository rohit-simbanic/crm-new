import { createContext } from 'react';
import { DashboardContextType2 } from 'types';
import { dashboardContextValue } from '../utility';

export const DashboardContext = createContext<DashboardContextType2>(
  dashboardContextValue
);
