import { Outlet, useParams } from 'react-router-dom';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import { useContext, useEffect, useState } from 'react';
import menuHelper from 'helpers/menu-helper';
import { ObjectType } from 'types';
import Breadcrumbs from './breadcrumbs';
import sideManuHelper from './side-menu-helper';
import ContainerRight from 'components/container/right';

const AccountPage = () => {
  const { setSideNavMenuItems } = useContext(LayoutProvider);

  const [routeName, setRouteName] = useState('');
  const pararms = useParams<ObjectType>();

  const loadMenuItems = async () => {
    let menus = sideManuHelper.getMenuItems(routeName);
    return menus;
  };

  const getMenus = async () => {
    let menusToshow = menuHelper.createMenusItems(
      await loadMenuItems(),
      pararms.account_id
    );
    setSideNavMenuItems(menusToshow);
  };

  useEffect(() => {
    getMenus();
  }, [routeName]);

  return (
    <>
      <Breadcrumbs
        params={{
          routeName,
          ...pararms
        }}
      />

      <ContainerRight>
        <Outlet context={{ routeName, setRouteName }} />
      </ContainerRight>
    </>
  );
};

export default AccountPage;
