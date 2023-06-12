//@ts-nocheck
import fieldLabel from 'assets/constants/fieldLabel';
import MuiBreadcrumbs from 'components/breadcrumbs';
import BreadcrumbItem from 'components/breadcrumbs/item';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ param }: ObjectType) => {
  let breadcrumbs = [];

  if (param.routeName === 'sqs') breadcrumbs = listView();

  if (param.routeName === 'sqs-create') breadcrumbs = create();

  if (param.routeName === 'sqs-view') breadcrumbs = view(param);

  if (param.routeName === 'sqs-edit') breadcrumbs = edit(param);

  if (param.routeName === 'sqs-change-log')
    breadcrumbs = sqsViewChangelog(param);

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const listView = () => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(<BreadcrumbItem type="title" title="SQS's" key={uuid()} />);
  return breadcrumbs;
};

const create = () => {
  let breadcrumbs = [];

  breadcrumbs.push(
    <BreadcrumbItem to="/" title={fieldLabel.home} type="link" key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem type="sqs" title={fieldLabel.sqs} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem type="title" title={fieldLabel.create} key={uuid()} />
  );
  return breadcrumbs;
};

const view = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.sqs_id);

  breadcrumbs.push(
    <BreadcrumbItem to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem to="/sqs" title={fieldLabel.sqs} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem type="title" title={record.name} key={uuid()} />
  );

  return breadcrumbs;
};

const edit = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.sqs_id);

  breadcrumbs.push(
    <BreadcrumbItem to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem to="/sqs" title={fieldLabel.sqs} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      to={`/sqs/${record.id}/view`}
      title={record.name}
      key={uuid()}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem type="title" title={fieldLabel.edit} key={uuid()} />
  );

  return breadcrumbs;
};

const sqsViewChangelog = (param) => {
  let breadcrumbs = [];

  let record = sessionHelper.getRecord(param.sqs_id);

  breadcrumbs.push(
    <BreadcrumbItem to="/" title={fieldLabel.home} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem to="/sqs" title={fieldLabel.sqs} key={uuid()} />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      to={`/sqs/${record.id}/view`}
      title={record.name}
      key={uuid()}
    />
  );
  breadcrumbs.push(
    <BreadcrumbItem
      type="title"
      title={fieldLabel.viewChangelogs}
      key={uuid()}
    />
  );

  return breadcrumbs;
};

export default Breadcrumbs;
