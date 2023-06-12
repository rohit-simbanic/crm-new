//@ts-nocheck

import fieldLabel from 'assets/constants/fieldLabel';
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'market-preferences-brokerage-users')
    breadcrumbs = listView();

  if (param.routeName === 'market-preferences-brokerage-users-create')
    breadcrumbs = create();

  if (param.routeName === 'market-preferences-brokerage-users-view')
    breadcrumbs = view(param);

  if (param.routeName === 'market-preferences-brokerage-users-edit')
    breadcrumbs = edit(param);

  if (param.routeName === 'market-preferences-brokerage-users-change-log')
    breadcrumbs = marketPreferencesBrokerageUsersViewChangelog(param);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const marketPreferencesBrokerageUsersItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem
        key={uuid()}
        to="/market-preferences-brokerage-users"
        title={fieldLabel.mpBrokerageUsers}
      />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem
        key={uuid()}
        type="title"
        title={fieldLabel.mpBrokerageUsers}
      />
    );
  }
  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs = marketPreferencesBrokerageUsersItems(false);
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];

  breadcrumbs = marketPreferencesBrokerageUsersItems(true);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createMpBrokerageUsers}
    />
  );
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(
    param.market_preference_brokerage_user_id
  );

  breadcrumbs = marketPreferencesBrokerageUsersItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );

  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(
    param.market_preference_brokerage_user_id
  );

  breadcrumbs = marketPreferencesBrokerageUsersItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences-brokerage-users/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );

  return breadcrumbs;
};

const marketPreferencesBrokerageUsersViewChangelog = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(
    param.market_preference_brokerage_user_id
  );
  breadcrumbs = marketPreferencesBrokerageUsersItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences-brokerage-users/${record.id}/view`}
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
