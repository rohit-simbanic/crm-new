//@ts-nocheck

import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import { ObjectType } from 'types';
import sessionHelper from 'helpers/session-helper';
import fieldLabel from 'assets/constants/fieldLabel';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];

  if (params.routeName === 'market-preferences') breadcrumbs = listView();

  if (params.routeName === 'market-preferences-create') breadcrumbs = create();

  if (params.routeName === 'market-preferences-view')
    breadcrumbs = view(params);

  if (params.routeName === 'market-preferences-edit')
    breadcrumbs = edit(params);

  if (params.routeName === 'market-preferences-view-market-offer-defaults')
    breadcrumbs = offerDefaults(params);

  if (params.routeName === 'market-preferences-2-brokerage-users')
    breadcrumbs = marketPreferences2BrokerageUsers(params);

  if (params.routeName === 'market-preferences-2-brokerage-users-create')
    breadcrumbs = marketPreferences2BrokerageUsersCreate(params);

  if (params.routeName === 'market-preferences-2-brokerage-users-replace')
    breadcrumbs = marketPreferences2BrokerageUserReplace(params);

  if (params.routeName === 'market-preferences-2-brokerage-users-terminate')
    breadcrumbs = marketPreferences2BrokerageUserTerminate(params);

  if (params.routeName === 'market-preferences-contracts')
    breadcrumbs = mpContracts(params);

  if (params.routeName === 'market-preferences-contracts-edit')
    breadcrumbs = mpEditContracts(params);

  if (params.routeName === 'market-preferences-contracts-selection')
    breadcrumbs = mpContractsSelection(params);

  if (params.routeName === 'market-preferences-email-templates')
    breadcrumbs = mpEmailTemplates(params);

  if (params.routeName === 'market-preferences-email-templates-edit')
    breadcrumbs = mpeditEmailTemplates(params);

  if (params.routeName === 'market-preferences-email-templates-selection')
    breadcrumbs = mpEmailTemplateSelection(params);

  if (params.routeName === 'market-preferences-documents')
    breadcrumbs = mpDocuments(params);

  if (params.routeName === 'market-preferences-documents-edit')
    breadcrumbs = mpDocumentEdit(params);

  if (params.routeName === 'market-preferences-documents-view')
    breadcrumbs = mpDocumentView(params);

  if (params.routeName === 'market-preferences-documents-create')
    breadcrumbs = mpDocumentCreate(params);

  if (params.routeName === 'market-preferences-change-log')
    breadcrumbs = mpViewChangeLog(params);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const create = (param) => {
  let breadcrumbs = [];
  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/market-preferences"
      title={fieldLabel.marketPreferences}
    />
  );
  breadcrumbs.push(<BreadcrumbItem key={uuid()} type="title" title="Create" />);
  return breadcrumbs;
};

const view = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.market_preference_id);

  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/market-preferences"
      title={fieldLabel.marketPreferences}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );

  return breadcrumbs;
};

const offerDefaults = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.market_preference_id);

  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/market-preferences"
      title={fieldLabel.marketPreferences}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.viewMarketOfferDefaults}
    />
  );

  return breadcrumbs;
};

const mpItems = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.market_preference_id);

  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/market-preferences"
      title={fieldLabel.marketPreferences}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${record.id}/view`}
      title={record.name}
    />
  );
  return breadcrumbs;
};

const marketPreferences2BrokerageUsers = (params) => {
  let breadcrumbs = mpItems(params);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.brokerageUsers}
    />
  );
  return breadcrumbs;
};

const marketPreferences2BrokerageUsersCreate = (params) => {
  let breadcrumbs = mpItems(params);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createBrokerageUser}
    />
  );
  return breadcrumbs;
};

const marketPreferences2BrokerageUserReplace = (param) => {
  let breadcrumbs = mpItems(param);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${param.market_preference_id}/market-preferences-brokerage-users`}
      title={fieldLabel.brokerageUsers}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.replaceUser} />
  );
  return breadcrumbs;
};

const marketPreferences2BrokerageUserTerminate = (param) => {
  let breadcrumbs = mpItems(param);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${param.market_preference_id}/market-preferences-brokerage-users`}
      title={fieldLabel.brokerageUsers}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.terminateUser}
    />
  );
  return breadcrumbs;
};

const edit = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.market_preference_id);

  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/market-preferences"
      title={fieldLabel.marketPreferences}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );

  return breadcrumbs;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title="Market Preference List" />
  );
  return breadcrumbs;
};

const mpContracts = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.contracts} />
  );
  return breadcrumbs;
};

const mpEditContracts = (param) => {
  let breadcrumbs = mpItems(param);
  let record = sessionHelper.getRecord(param.market_preference_id);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${record.id}/contracts`}
      title={fieldLabel.contracts}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const mpContractsSelection = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.selectContracts}
    />
  );
  return breadcrumbs;
};

const mpEmailTemplates = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.emailTemplates}
    />
  );
  return breadcrumbs;
};

const mpeditEmailTemplates = (param) => {
  let breadcrumbs = mpItems(param);
  let record = sessionHelper.getRecord(param.market_preference_id);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/market-preferences/${record.id}/email-templates`}
      title={fieldLabel.emailTemplates}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const mpEmailTemplateSelection = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.selectEmailTemplates}
    />
  );
  return breadcrumbs;
};

const mpDocuments = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.documents} />
  );
  return breadcrumbs;
};

const mpDocumentEdit = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const mpDocumentView = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.selectDocuments}
    />
  );
  return breadcrumbs;
};

const mpDocumentCreate = (param) => {
  let breadcrumbs = mpItems(param);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createDocument}
    />
  );
  return breadcrumbs;
};

const mpViewChangeLog = (param) => {
  let breadcrumbs = mpItems(param);
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
