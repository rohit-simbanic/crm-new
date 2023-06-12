//@ts-nocheck

import fieldLabel from 'assets/constants/fieldLabel';
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];

  if (params.routeName === 'email-templates') breadcrumbs = listView();

  if (params.routeName === 'email-templates-view') breadcrumbs = view(params);

  if (params.routeName === 'email-templates-edit') breadcrumbs = edit(params);

  if (params.routeName === 'email-templates-duplicate')
    breadcrumbs = duplicate();

  if (params.routeName === 'email-templates-create') breadcrumbs = create();

  if (params.routeName === 'email-templates-market-preferences')
    breadcrumbs = emailTemplatesMarketPreferences(params);

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
      title={fieldLabel.emailTemplates}
    />
  );
  return breadcrumbs;
};

const view = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.email_template_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/email-templates"
      title={fieldLabel.emailTemplates}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/email-templates"
      title={fieldLabel.emailTemplates}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createEmailTemplate}
    />
  );
  return breadcrumbs;
};

const edit = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.email_template_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/email-templates"
      title={fieldLabel.emailTemplates}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/email-templates/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const duplicate = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/email-templates"
      title={fieldLabel.emailTemplates}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createEmailTemplate}
    />
  );
  return breadcrumbs;
};

const emailTemplatesMarketPreferences = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.email_template_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/email-templates"
      title={fieldLabel.emailTemplates}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/email-templates/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.marketPreferences}
    />
  );
  return breadcrumbs;
};

export default Breadcrumbs;
