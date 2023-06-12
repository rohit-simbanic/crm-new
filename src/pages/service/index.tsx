import ContainerRight from 'components/container/right';
import menuHelper from 'helpers/menu-helper';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ObjectType } from 'types';

import Breadcrumbs from './breadcrumbs';
import sideManuHelper from './side-menu-helper';

const ServicePage = () => {
  const { setSideNavMenuItems } = useContext(LayoutProvider);
  const [routeName, setRouteName] = useState('');
  const params = useParams<ObjectType>();

  const loadMenuItems = async () => {
    let menus = sideManuHelper.getMenuItems(routeName);
    return menus;
  };

  const getMenus = async () => {
    let menusToshow = menuHelper.createMenusItems(
      await loadMenuItems(),
      params.service_id
    );

    setSideNavMenuItems(menusToshow);
  };

  useEffect(() => {
    getMenus();
  }, [routeName]);

  return (
    <>
      <Breadcrumbs
        param={{
          routeName,
          ...params
        }}
      />
      <ContainerRight>
        <Outlet context={{ routeName, setRouteName }} />
      </ContainerRight>
    </>
  );
};

export default ServicePage;
