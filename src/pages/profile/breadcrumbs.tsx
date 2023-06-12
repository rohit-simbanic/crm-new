//@ts-nocheck

import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];
  if (params?.routeName === 'profile-edit') {
    breadcrumbs = edit(params);
  }

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const edit = (param) => {
  let breadcrumbs = [];
  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title="Profile" />
  );
  return breadcrumbs;
};

export default Breadcrumbs;
