//@ts-nocheck
import fieldLabel from 'assets/constants/fieldLabel';
import MuiBreadcrumbs from 'components/breadcrumbs';
import BreadcrumbItem from 'components/breadcrumbs/item';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'services') breadcrumbs = listView();

  if (param.routeName === 'services-create') breadcrumbs = create();

  if (param.routeName === 'services-view') breadcrumbs = view(param);

  if (param.routeName === 'services-edit') breadcrumbs = edit(param);

  if (param.routeName === 'services-change-log')
    breadcrumbs = serviceViewChangelog(param);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const serviceItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );

  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} to="/services" title={fieldLabel.services} />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.services} />
    );
  }
  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs = serviceItems(false);
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];
  breadcrumbs = serviceItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.service_id);

  breadcrumbs = serviceItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );

  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.service_id);

  breadcrumbs = serviceItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/services/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );

  return breadcrumbs;
};

const serviceViewChangelog = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.service_id);

  breadcrumbs = serviceItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/services/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.viewChangelogs}
    />
  );

  return breadcrumbs;
};
export default Breadcrumbs;
