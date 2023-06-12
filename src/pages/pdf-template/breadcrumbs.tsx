//@ts-nocheck

import fieldLabel from 'assets/constants/fieldLabel';
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'pdf-templates') breadcrumbs = listView();

  if (param.routeName === 'pdf-templates-view') breadcrumbs = view(param);

  if (param.routeName === 'pdf-templates-edit') breadcrumbs = edit(param);

  if (param.routeName === 'pdf-templates-create') breadcrumbs = create();

  if (param.routeName === 'pdf-templates-pdf-view')
    breadcrumbs = viewAsPDF(param);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.contracts} />
  );
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.pdf_template_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/pdf-templates"
      title={fieldLabel.contracts}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );
  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.pdf_template_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/pdf-templates"
      title={fieldLabel.contracts}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/pdf-templates/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.editContract} />
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
      to="/pdf-templates"
      title={fieldLabel.contracts}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createContract}
    />
  );
  return breadcrumbs;
};

const viewAsPDF = (param) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(param.pdf_template_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/pdf-templates"
      title={fieldLabel.contracts}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/pdf-templates/${record.id}/view`}
      title={record.name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.viewAsPdf} />
  );
  return breadcrumbs;
};

export default Breadcrumbs;
