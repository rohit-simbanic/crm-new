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
  const [show, setShow] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(!isHovered);
  };

  const toggleVisibility = () => {
    setShow(!show);
    setIsHovered(!true);
  };

  const handleMouseLeaveConditionally = () => {
    if (show || isHovered) {
      handleMouseLeave(); // Call the handleMouseLeave function when the condition is met
    }
  };

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
      <Icon
        sx={{
          position: 'absolute',
          top: '72px',
          right: `${show ? '-11px' : '-16px'}`,
          height: '29px',
          width: '29px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          zIndex: 2222,
          color: '#000',
          cursor: 'pointer',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          display: { xs: 'none', sm: 'block' }
        }}
        onClick={toggleVisibility}
      >
        {show ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </Icon>
      <Drawer
        variant="permanent"
        sx={{
          width: show || isHovered ? drawerWidth : '114px',
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          overflowY: 'hidden',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: show || isHovered ? drawerWidth : '118px',
            '&::-webkit-scrollbar-track': {
              WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px'
            },
            '&::-webkit-scrollbar': {
              width: '5px',
              backgroundColor: '#F5F5F5'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#AAA',
              borderRadius: '10px',
              backgroundImage: '#F5F5F5'
            }
          }
        }}
        open
        onMouseLeave={handleMouseLeaveConditionally}
      >
        {show || isHovered ? (
          <Menu items={props.items} handleCloseUserMenu={handleMobileSideNav} />
        ) : (
          <Menu
            items={props.items}
            handleCloseUserMenu={handleMobileSideNav}
            short={true}
            handleMouseEnter={handleMouseEnter}
          />
        )}
      </Drawer>
      )
    </div>
  );
};

export default SideNavPanel;
