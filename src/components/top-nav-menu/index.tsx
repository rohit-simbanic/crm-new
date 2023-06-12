import React, { useContext } from 'react';
import { AppBar, Toolbar, useTheme } from '@mui/material';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import ActivityComponent from 'features/activity';

const TopNavMenu = () => {
  const theme = useTheme();

  let styles = {
    menu: {
      backgroundColor: '#001e33',
      color: '#AAA',
      borderBottom: '1px solid #E7E7E7'
    }
  };
  if (theme.palette.mode === 'dark') {
    styles = {
      menu: {
        backgroundColor: '#272727',
        color: 'white',
        borderBottom: '1px solid #404040'
      }
    };
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: styles.menu.backgroundColor,
          color: styles.menu.color,
          boxShadow: 'none',
          borderBottom: styles.menu.borderBottom,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ padding: 0 }}>
          <DesktopMenu />
          <MobileMenu />
        </Toolbar>
      </AppBar>
      <ActivityComponent />
    </>
  );
};

export default TopNavMenu;
