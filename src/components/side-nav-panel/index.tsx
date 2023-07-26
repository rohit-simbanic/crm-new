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

  const toggleVisibility = () => {
    setShow(!show);
  };
  let lengthOfItem: number = props.items.length;

  console.log(props.items);
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
            top: '72px',
            right: `${show ? '-9px' : '-16px'}`,
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
          {show ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
        </Icon>
      )}

      {show ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            display: { xs: 'none', sm: 'block' },
            flexShrink: 0,
            overflowY: 'hidden',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              '&::-webkit-scrollbar-track': {
                WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#F5F5F5',
                borderRadius: '10px'
              },
              '&::-webkit-scrollbar': {
                width: '10px',
                backgroundColor: '#F5F5F5'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#AAA',
                borderRadius: '10px',
                backgroundImage:
                  '-webkit-linear-gradient(90deg, rgba(0, 0, 0, .2) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .2) 75%, transparent 75%, transparent)'
              }
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
            width: `${lengthOfItem === 14 ? '114px' : drawerWidth}`,
            display: { xs: 'none', sm: 'block' },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: `${lengthOfItem === 14 ? '118px' : drawerWidth}`,
              '&::-webkit-scrollbar-track': {
                WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#F5F5F5',
                borderRadius: '10px'
              },
              '&::-webkit-scrollbar': {
                width: '10px',
                backgroundColor: '#F5F5F5'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#AAA',
                borderRadius: '10px',
                backgroundImage:
                  '-webkit-linear-gradient(90deg, rgba(0, 0, 0, .2) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .2) 75%, transparent 75%, transparent)'
              }
            }
          }}
          open
        >
          <Menu
            items={props.items}
            handleCloseUserMenu={handleMobileSideNav}
            short={true}
          />
        </Drawer>
      )}
    </div>
  );
};

export default SideNavPanel;
