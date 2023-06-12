//@ts-nocheck
import fieldLabel from 'assets/constants/fieldLabel';
import MuiBreadcrumbs from 'components/breadcrumbs';
import BreadcrumbItem from 'components/breadcrumbs/item';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'tasks') breadcrumbs = listView();

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(<BreadcrumbItem key={uuid()} type="title" title="Task's" />);
  return breadcrumbs;
};

export default Breadcrumbs;
