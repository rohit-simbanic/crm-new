import { Drawer, styled } from '@mui/material';

export const MobileMenuDrawer = () => {
  return styled(Drawer)(({ theme }: any) => ({
    [theme.breakpoints.up('900')]: {
      display: 'none'
    }
  }));
};
