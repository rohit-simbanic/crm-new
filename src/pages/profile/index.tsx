import ContainerRight from 'components/container/right';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import Breadcrumbs from './breadcrumbs';

const ProfilePage = () => {
  const [routeName, setRouteName] = useState('');
  const params = useParams<ObjectType>();
  const { setSideNavMenuItems } = useContext(LayoutProvider);

  const getMenus = async () => {
    setSideNavMenuItems([]);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <Breadcrumbs
        params={{
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

export default ProfilePage;
