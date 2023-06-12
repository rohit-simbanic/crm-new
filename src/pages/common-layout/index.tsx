//@ts-nocheck
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SideNavPanel from 'components/side-nav-panel';
import TopNavMenu from 'components/top-nav-menu';
import LoginForm from 'features/login/login-form';
import { redirectToLogin } from 'helpers/auth-helper';
import eventBus from 'helpers/event-bus-helper';
import menuHelper from 'helpers/menu-helper';
import { isEmpty } from 'helpers/misc-helper';
import { AuthContext } from 'hooks/auth/auth-context';
import useAuthenticated from 'hooks/auth/use-authenticated';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import adminConfigService from 'services/admin-config';
import userService from 'services/user-service';
import { ObjectType } from 'types';

import LayoutProvider from './layout-provider-context';

export const drawerWidth = 230;

const CommonLayout = () => {
  const isAuthenticated = useAuthenticated();
  const { state, dispatch } = useContext(AuthContext);

  const [sideNavMenuItems, setSideNavMenuItems] = useState({});
  const [isRecentViewOpen, setIsRecentViewOpen] = useState(false);

  const [isPermissionLoading, setPermissionLoading] = useState(false);

  const [mobileSideNavOpen, toggleMobileSideNav] = useState(false);
  const [mobileTopNavOpen, toggleMobileTopNav] = useState(false);

  const [topBar, setTopBar] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleRecentView = () => {
    setIsRecentViewOpen(!isRecentViewOpen);
  };

  const handleMobileSideNav = () => {
    toggleMobileSideNav(!mobileSideNavOpen);
  };

  const handleMobileTopNav = () => {
    toggleMobileTopNav(!mobileTopNavOpen);
  };

  if (!isAuthenticated) {
    redirectToLogin();
  }

  const getCurrentUser = async () => {
    const user: ObjectType = await userService.getCurrentUser();

    if (user.isSuccess) {
      window.Appcues.identify(
        user.data.id, // unique, required
        {
          firstName: user.data.first_name, // current user's first name
          lastName: user.data.last_name, // current user's first name
          email: user.data.email // Current user's email
        }
      );

      dispatch({
        type: 'SET_USER',
        payload: {
          user: user.data
        }
      });

      getAdminConfig();
    }

    if (user.isError) {
      redirectToLogin();
    }
  };

  const getConfigValue = (data: any, key: string) => {
    return data
      .map((x: any) => {
        if ([key].includes(x.name)) {
          return x;
        }
      })
      .filter((e: any) => e);
  };

  const getAdminConfig = async () => {
    const adminConfig: ObjectType = await adminConfigService.get();
    let loginUser = JSON.parse(localStorage.getItem('user')!);

    if (adminConfig.isSuccess) {
      const countryCode = getConfigValue(
        adminConfig?.data?.data,
        'cts_country_code'
      );
      const statusRestrictionOfferdate = getConfigValue(
        adminConfig?.data?.data,
        'status_restriction_offer_date'
      );

      const leaseTypeRestrictionOfferdate = getConfigValue(
        adminConfig?.data?.data,
        'lease_type_restriction_offerdate'
      );

      loginUser.user.cts_country_code =
        countryCode[0]['value'] || '' ? countryCode[0]['value'] : '+1';

      loginUser.user.status_restriction_offer_date =
        statusRestrictionOfferdate[0]['value'] || ''
          ? statusRestrictionOfferdate[0]['value']
          : '';

      loginUser.user.lease_type_restriction_offerdate =
        leaseTypeRestrictionOfferdate[0]['value'] || ''
          ? leaseTypeRestrictionOfferdate[0]['value']
          : '';

      if (!isEmpty(loginUser)) {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: loginUser?.user
          }
        });
      }
    }
  };

  const loadPermission = async () => {
    setPermissionLoading(true);
    await menuHelper.getAllPermissions();
    setPermissionLoading(false);
  };

  useEffect(() => {
    eventBus.on('LOAD_PERMISSION', () => {
      getCurrentUser();
      loadPermission();
    });
  }, []);

  if (isAuthenticated) {
    return (
      <>
        <LayoutProvider.Provider
          value={{
            mobileTopNavOpen,
            mobileSideNavOpen,
            handleMobileSideNav,
            handleMobileTopNav,
            sideNavMenuItems,
            setSideNavMenuItems,
            isRecentViewOpen,
            toggleRecentView,
            topBar,
            setTopBar
          }}
        >
          {!isPermissionLoading && (
            <>
              <TopNavMenu />

              <SideNavPanel items={sideNavMenuItems} />

              <Box
                component="main"
                sx={{
                  marginTop: '65px',
                  height: 'calc(100vh - 9vh)',
                  overflow: 'auto',
                  width:
                    matches === false
                      ? '100%'
                      : `calc(100% - ${drawerWidth}px)`,
                  mb: '16px'
                }}
              >
                <Outlet />
              </Box>
            </>
          )}
        </LayoutProvider.Provider>
      </>
    );
  }

  return <LoginForm />;
};

export default CommonLayout;
