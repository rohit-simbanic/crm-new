import menuHelper from 'helpers/menu-helper';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import Breadcrumbs from './breadcrumbs';
import sideManuHelper from './side-menu-helper';
import ContainerRight from 'components/container/right';

const Document = () => {
  const { setSideNavMenuItems } = useContext(LayoutProvider);
  const [routeName, setRouteName] = useState('');
  const param = useParams<ObjectType>();

  const loadMenuItems = async () => {
    let menus = await sideManuHelper.getMenuItems(routeName);
    return menus;
  };

  const getMenus = async () => {
    let menusToshow = menuHelper.createMenusItems(
      await loadMenuItems(),
      param.document_id
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
          ...param
        }}
      />
      <ContainerRight>
        <Outlet context={{ routeName, setRouteName }} />
      </ContainerRight>
    </>
  );
};

export default Document;
