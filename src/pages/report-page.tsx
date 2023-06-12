import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutProvider from './common-layout/layout-provider-context';
import reportMenuItems from 'assets/menus/side-menu/report';
import ContainerRight from 'components/container/right';

const ReportPage = () => {
  const { setSideNavMenuItems } = useContext(LayoutProvider);

  const getMenus = async () => {
    setSideNavMenuItems(reportMenuItems.list);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <ContainerRight>
        <Outlet />
      </ContainerRight>
    </>
  );
};

export default ReportPage;
