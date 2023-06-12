//@ts-nocheck
import fieldLabel from 'assets/constants/fieldLabel';
import MuiBreadcrumbs from 'components/breadcrumbs';
import BreadcrumbItem from 'components/breadcrumbs/item';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'opportunity-brokerage-users')
    breadcrumbs = listView();

  if (param.routeName === 'opportunity-brokerage-users-create')
    breadcrumbs = create();

  if (param.routeName === 'opportunity-brokerage-users-view')
    breadcrumbs = view(param);

  if (param.routeName === 'opportunity-brokerage-users-edit')
    breadcrumbs = edit(param);

  if (param.routeName === 'opportunity-brokerage-users-change-log')
    breadcrumbs = opportunityBrokerageUsersViewChangelog(param);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const opportunityBrokerageUserstemsItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem
        key={uuid()}
        to="/opportunity-brokerage-users"
        title={fieldLabel.opportunityBrokerageUsers}
      />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem
        key={uuid()}
        type="title"
        title={fieldLabel.opportunityBrokerageUsers}
      />
    );
  }
  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs = opportunityBrokerageUserstemsItems(false);
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];

  breadcrumbs = opportunityBrokerageUserstemsItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.opportunity_brokerage_user_id);

  breadcrumbs = opportunityBrokerageUserstemsItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );

  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.opportunity_brokerage_user_id);

  breadcrumbs = opportunityBrokerageUserstemsItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunity-brokerage-users/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );

  return breadcrumbs;
};

const opportunityBrokerageUsersViewChangelog = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.opportunity_brokerage_user_id);
  breadcrumbs = opportunityBrokerageUserstemsItems(true);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunity-brokerage-users/${record.id}/view`}
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
