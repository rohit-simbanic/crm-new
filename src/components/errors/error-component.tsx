import React from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { tokens } from 'theme';

const ErrorComponent = ({ message }: { message: string | undefined }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          color: 'error',
          maxHeight: '100px'
        }}
      >
        <Stack p={1}>{message}</Stack>
      </Box>
    </>
  );
};

export default ErrorComponent;
