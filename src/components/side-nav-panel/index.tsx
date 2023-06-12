import Menu from './menu';
import Drawer from '@mui/material/Drawer';
import { useContext } from 'react';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import { drawerWidth } from 'pages/common-layout';

interface MenuItemInterface {
  items: {};
}

const SideNavPanel = (props: MenuItemInterface) => {
  const { mobileSideNavOpen, handleMobileSideNav } = useContext(LayoutProvider);

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileSideNavOpen}
        onClose={handleMobileSideNav}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Menu items={props.items} handleCloseUserMenu={handleMobileSideNav} />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        <Menu items={props.items} handleCloseUserMenu={handleMobileSideNav} />
      </Drawer>
    </>
  );
};

export default SideNavPanel;
