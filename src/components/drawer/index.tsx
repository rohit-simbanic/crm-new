import React from 'react';
import { Box, Drawer, useTheme } from '@mui/material';
import { tokens } from 'theme';

export const DrawerComponent = ({
  anchor,
  open,
  onClose,
  children
}: {
  anchor: any;
  open: boolean;
  onClose: (e: any) => any;
  children: any;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Drawer
      anchor={anchor}
      open={open}
      variant="temporary"
      onClose={onClose}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          boxSizing: 'border-box',
          top: 62,
          padding: '10px 20px 70px 20px',
          backgroundColor:
            theme.palette.mode === 'dark' ? colors.primary[500] : '',
          width: '30%',
          [theme.breakpoints.down(1015)]: {
            width: '35%'
          },
          [theme.breakpoints.down(870)]: {
            width: '50%'
          },
          [theme.breakpoints.down(609)]: {
            top: 56,
            width: '60%'
          },
          [theme.breakpoints.down(508)]: {
            top: 55,
            width: '70%'
          },
          [theme.breakpoints.down(435)]: {
            top: 56,
            width: '75%'
          }
        }
      }}
    >
      <Box sx={{ overflow: 'auto' }}>{children}</Box>
    </Drawer>
  );
};
