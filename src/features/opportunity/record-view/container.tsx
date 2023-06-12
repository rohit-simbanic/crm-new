import { Box } from '@mui/material';

export const ViewContainer = ({ children }: any) => (
  <Box p={1} sx={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
    {' '}
    {children}
  </Box>
);

export const EditContainer = ({ children }: any) => (
  <Box p={1} sx={{ maxHeight: '500px', overflowY: 'auto' }}>
    {children}
  </Box>
);
