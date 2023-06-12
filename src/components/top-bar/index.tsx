import { Box } from '@mui/material';
import { ReactNode } from 'react';

const TopBar = ({ sx = {}, children }: { sx?: any; children: ReactNode }) => (
  <Box sx={{ borderBottom: 1, borderColor: 'divider', ...sx }}>{children}</Box>
);

export default TopBar;
