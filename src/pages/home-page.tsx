import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutProvider from './common-layout/layout-provider-context';

const HomePage = () => {
  const { setSideNavMenuItems } = useContext(LayoutProvider);

  const getMenus = async () => {
    setSideNavMenuItems([]);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default HomePage;
