import Menu from './menu';
import Drawer from '@mui/material/Drawer';
import Icon from '@mui/material/Icon';
import { useContext, useState } from 'react';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import { drawerWidth } from 'pages/common-layout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface MenuItemInterface {
  items: [];
}

const SideNavPanel = (props: MenuItemInterface) => {
  const { mobileSideNavOpen, handleMobileSideNav } = useContext(LayoutProvider);
  const [hidden, setHidden] = useState(false);

  const toggleVisibility = () => {
    setHidden(!hidden);
  };
  let lengthOfItem: number = props.items.length;

  return (
    <div style={{ position: 'relative' }}>
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
      {lengthOfItem === 14 && (
        <Icon
          sx={{
            position: 'absolute',
            top: '58px',
            right: '-5px',
            height: '29px',
            width: '29px',
            borderRadius: '50%',
            backgroundColor: '#afafaf',
            zIndex: 2222,
            color: '#fff',
            cursor: 'pointer',
            display: { xs: 'none', sm: 'block' }
          }}
          onClick={toggleVisibility}
        >
          {!hidden ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
        </Icon>
      )}

      {!hidden ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            display: { xs: 'none', sm: 'block' },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          <Menu items={props.items} handleCloseUserMenu={handleMobileSideNav} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: `${lengthOfItem === 14 ? '24px' : drawerWidth}`,
            display: { xs: 'none', sm: 'block' },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: `${lengthOfItem === 14 ? '29px' : drawerWidth}`
            }
          }}
          open
        ></Drawer>
      )}
    </div>
  );
};

export default SideNavPanel;
