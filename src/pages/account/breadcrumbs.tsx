//@ts-nocheck
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import fieldLabel from 'assets/constants/fieldLabel';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }) => {
  let breadcrumbs = [];

  if (params.routeName === 'accounts') {
    breadcrumbs = listView();
  }

  if (params.routeName === 'accounts-view') {
    breadcrumbs = view(params);
  }

  if (params.routeName === 'accounts-edit') {
    breadcrumbs = edit(params);
  }

  if (params.routeName === 'accounts-create') {
    breadcrumbs = create(params);
  }

  if (params.routeName === 'accounts-msa') {
    breadcrumbs = accountMsa(params);
  }

  if (params.routeName === 'accounts-msa-selection') {
    breadcrumbs = accountMsaSelection(params);
  }

  if (params.routeName === 'accounts-change-log') {
    breadcrumbs = accountChangeLog(params);
  }

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const accountItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem
        key={uuid()}
        to="/accounts"
        title={fieldLabel.customerAccounts}
      />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem
        key={uuid()}
        type="title"
        title={fieldLabel.customerAccounts}
      />
    );
  }
  console.log('account breadcrumb:', breadcrumbs);
  return breadcrumbs;
};

const view = (params) => {
  let record = sessionHelper.getRecord(params.account_id);

  let breadcrumbs = [];
  breadcrumbs = accountItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record?.name} />
  );
  console.log('view:', breadcrumbs);
  return breadcrumbs;
};

const edit = (params) => {
  let record = sessionHelper.getRecord(params.account_id);

  let breadcrumbs = [];
  breadcrumbs = accountItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/accounts/${params.account_id}/view`}
      title={record?.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );

  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs = accountItems(false);
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];
  breadcrumbs = accountItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const accountMsa = (params) => {
  let record = sessionHelper.getRecord(params.account_id);

  let breadcrumbs = [];
  breadcrumbs = accountItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/accounts/${params.account_id}/view`}
      title={record?.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.msaList} />
  );

  return breadcrumbs;
};

const accountMsaSelection = (params) => {
  let record = sessionHelper.getRecord(params.account_id);

  let breadcrumbs = [];
  breadcrumbs = accountItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/accounts/${params.account_id}/view`}
      title={record?.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.msaSelectionList}
    />
  );

  return breadcrumbs;
};

const accountChangeLog = (params) => {
  let record = sessionHelper.getRecord(params.account_id);

  let breadcrumbs = [];
  breadcrumbs = accountItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/accounts/${params.account_id}/view`}
      title={record?.name}
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
