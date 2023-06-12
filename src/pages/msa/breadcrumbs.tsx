//@ts-nocheck

import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import { ObjectType } from 'types';
import sessionHelper from 'helpers/session-helper';
import fieldLabel from 'assets/constants/fieldLabel';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];

  if (params.routeName === 'msa') {
    breadcrumbs = listView(params);
  }

  if (params.routeName === 'msa-view') {
    breadcrumbs = view(params);
  }

  if (params.routeName === 'msa-create') {
    breadcrumbs = create(params);
  }

  if (params.routeName === 'msa-edit') {
    breadcrumbs = edit(params);
  }

  if (params.routeName === 'msa-accounts') {
    breadcrumbs = msaAccount(params);
  }

  if (params.routeName === 'msa-accounts-view') {
    breadcrumbs = msaAccountView(params);
  }

  if (params.routeName === 'msa-change-log') {
    breadcrumbs = masViewChangelog(params);
  }

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const masItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} to="/msa" title={fieldLabel.msaList} />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.msaList} />
    );
  }
  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs = masItems(false);
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.msa_id);
  breadcrumbs = masItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );
  return breadcrumbs;
};

const create = (param) => {
  let breadcrumbs = [];
  breadcrumbs = masItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.msa_id);
  breadcrumbs = masItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/msa/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const msaAccount = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.msa_id);
  breadcrumbs = masItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/msa/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.customerAccounts}
    />
  );
  return breadcrumbs;
};

const msaAccountView = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.msa_id);
  breadcrumbs = masItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/msa/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.customerAccounts}
    />
  );
  return breadcrumbs;
};

const masViewChangelog = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.msa_id);
  breadcrumbs = masItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/msa/${record.id}/view`}
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
