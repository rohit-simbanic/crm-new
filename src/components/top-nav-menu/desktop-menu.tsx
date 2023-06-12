import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  ButtonGroup,
  Menu as MuiMenu,
  useTheme
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import fieldLabel from 'assets/constants/fieldLabel';
import EnteraLogo from 'assets/images/entera-logo.png';
import dashboardTopMenuItems from 'assets/menus/dashboard-top-menu';
import topMenuItems from 'assets/menus/top-menu';
import CustomButton from 'components/form/button-custom';
import RouteLink from 'components/link/route-link';
import Menu from 'components/side-nav-panel/menu';
import layoutConfig from 'config/layout';
import { AuthContext } from 'hooks/auth/auth-context';
import useColorToken from 'hooks/useColorToken';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import profileTopMenuItems from 'assets/menus/profile-top-menu';

const DesktopMenu = () => {
  const theme = useTheme();

  const colors = useColorToken();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [allAnchorEl, setAllAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const {
    mobileTopNavOpen,
    handleMobileSideNav,
    handleMobileTopNav,
    toggleRecentView
  } = React.useContext(LayoutProvider);

  const { dispatch } = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const openAll = Boolean(allAnchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAllMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAllAnchorEl(event.currentTarget);
  };

  const handleAllMenuClose = () => {
    setAllAnchorEl(null);
  };

  const [anchorAccountEl, setAnchorAccountEl] =
    React.useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorAccountEl);
  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccountEl(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorAccountEl(null);
  };

  let styles = {
    menu: {
      backgroundColor: '#001e33de',
      color: `${colors.white[900]} !important`,
      borderBottom: `1px solid ${colors.white[800]}`
    }
  };
  if (theme.palette.mode === 'dark') {
    styles = {
      menu: {
        backgroundColor: '#272727 ',
        color: 'white !important',
        borderBottom: '1px solid #404040'
      }
    };
  }

  return (
    <>
      <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMobileSideNav}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Link
        to="/home"
        style={{
          color: styles.menu.color,
          textDecoration: 'none',
          width: layoutConfig.sideNavPanelWidth
        }}
      >
        <Box
          component="img"
          style={{
            width: '70%'
          }}
          alt="Entera"
          src={EnteraLogo}
        />
      </Link>

      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex'
          }
        }}
      >
        <CustomButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          label={fieldLabel.dashboards}
          style={{ color: colors.white[800] }}
          endIcon={<KeyboardArrowDownIcon />}
        />

        <MuiMenu
          sx={{ mt: '35px' }}
          id="basic-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(open)}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 18,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
        >
          <Menu
            items={dashboardTopMenuItems}
            handleCloseUserMenu={handleClose}
            topMenu={true}
          />
        </MuiMenu>

        <CustomButton
          id="properties-button"
          label={
            <RouteLink
              url="/properties"
              style={{ color: colors.white[800] }}
              name={fieldLabel.properties}
            />
          }
        />

        <CustomButton
          id="reports-button"
          label={
            <RouteLink
              url="/reports"
              style={{ color: colors.white[800] }}
              name={fieldLabel.reports}
            />
          }
        />

        <CustomButton
          id="all-menu"
          aria-controls={openAll ? 'all-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openAll ? 'true' : undefined}
          onClick={handleAllMenuClick}
          label={fieldLabel.all}
          style={{ color: colors.white[800] }}
          endIcon={<KeyboardArrowDownIcon />}
        />

        <MuiMenu
          sx={{ mt: '35px' }}
          id="menu-appbar"
          anchorEl={allAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(openAll)}
          onClose={handleAllMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 45,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
        >
          <Menu
            items={topMenuItems}
            handleCloseUserMenu={handleAllMenuClose}
            topMenu={true}
          />
        </MuiMenu>
      </Box>
      <Box sx={{ flexGrow: 200 }} />
      <Box>
        <ButtonGroup disableElevation variant="text">
          <IconButton
            onClick={() => {
              toggleRecentView();
            }}
            type="button"
            style={{ color: colors.white[800] }}
          >
            <AccessTimeFilledIcon />
          </IconButton>
          <IconButton
            onClick={handleClickAccount}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openAccount ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openAccount ? 'true' : undefined}
            style={{ color: colors.white[800] }}
          >
            <Avatar sx={{ width: 24, height: 24 }} />
          </IconButton>

          <MuiMenu
            anchorEl={anchorAccountEl}
            id="account-menu"
            open={openAccount}
            onClose={handleCloseAccount}
            onClick={handleCloseAccount}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Menu
              items={profileTopMenuItems}
              handleCloseUserMenu={handleCloseAccount}
              topMenu={true}
            />
          </MuiMenu>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default DesktopMenu;
