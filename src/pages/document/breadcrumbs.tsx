//@ts-nocheck

import fieldLabel from 'assets/constants/fieldLabel';
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];

  if (params.routeName === 'documents') {
    breadcrumbs = listView();
  }

  if (params.routeName === 'documents-view') {
    breadcrumbs = view(params);
  }

  if (params.routeName === 'documents-edit') {
    breadcrumbs = edit(params);
  }

  if (params.routeName === 'documents-create') {
    breadcrumbs = create();
  }

  if (params.routeName === 'documents-revisions')
    breadcrumbs = revisionListView(params);

  if (params.routeName === 'documents-revisions-view')
    breadcrumbs = revisionListView(params);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.documents}
      key={uuid()}
    />
  );
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/documents"
      title={fieldLabel.documents}
      key={uuid()}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.createDocument}
      key={uuid()}
    />
  );
  return breadcrumbs;
};

const view = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.document_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/documents"
      title={fieldLabel.documents}
      key={uuid()}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={record.document_name}
      key={uuid()}
    />
  );
  return breadcrumbs;
};

const edit = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.document_id);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/documents"
      title={fieldLabel.documents}
      key={uuid()}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/documents/${record.id}/view`}
      title={record.document_name}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.edit}
      key={uuid()}
    />
  );
  return breadcrumbs;
};

const revisionListView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title="Home" key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to="/documents"
      title="Documents"
      key={uuid()}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title="Revisions" key={uuid()} />
  );
  return breadcrumbs;
};

export default Breadcrumbs;
