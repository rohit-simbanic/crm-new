//@ts-nocheck
import fieldLabel from 'assets/constants/fieldLabel';
import MuiBreadcrumbs from 'components/breadcrumbs';
import BreadcrumbItem from 'components/breadcrumbs/item';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'transaction-histories') breadcrumbs = listView();

  if (param.routeName === 'transaction-histories-view')
    breadcrumbs = view(param);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.transactionHistories}
    />
  );
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.transaction_history_id);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/transaction-histories"
      title={fieldLabel.transactionHistories}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );

  return breadcrumbs;
};

export default Breadcrumbs;
