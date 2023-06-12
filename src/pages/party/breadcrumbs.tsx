//@ts-nocheck

import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import { ObjectType } from 'types';
import fieldLabel from 'assets/constants/fieldLabel';
import sessionHelper from 'helpers/session-helper';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];
  if (params.routeName === 'parties-list') {
    breadcrumbs = listView(params);
  }

  if (params.routeName === 'parties-view') {
    breadcrumbs = view(params);
  }

  if (params.routeName === 'parties-create') {
    breadcrumbs = create(params);
  }

  if (params.routeName === 'parties-edit') {
    breadcrumbs = edit(params);
  }

  if (params.routeName === 'parties-change-log') {
    breadcrumbs = partyViewChangelog(params);
  }

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const partyItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} to="/parties" title={fieldLabel.parties} />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.parties} />
    );
  }
  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs = partyItems(false);
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.party_id);
  breadcrumbs = partyItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );
  return breadcrumbs;
};

const create = (param) => {
  let breadcrumbs = [];
  breadcrumbs = partyItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.party_id);
  breadcrumbs = partyItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/parties/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const partyViewChangelog = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.msa_id);
  breadcrumbs = partyItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/parties/${record.id}/view`}
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
