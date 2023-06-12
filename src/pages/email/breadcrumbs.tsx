//@ts-nocheck

import fieldLabel from 'assets/constants/fieldLabel';
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }: ObjectType) => {
  let breadcrumbs = [];

  if (params.routeName === 'inbox-emails') breadcrumbs = inbox();

  if (params.routeName === 'draft-emails') breadcrumbs = draft(params);

  if (params.routeName === 'inbox-thread-emails')
    breadcrumbs = inboxEmailThread(params);

  if (params.routeName === 'compose-emails') breadcrumbs = composer();

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

const emailItems = (isLink) => {
  let breadcrumbs = [];
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  if (isLink) {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} to="/email/inbox" title={fieldLabel.inbox} />
    );
  } else {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.inbox} />
    );
  }
  return breadcrumbs;
};

const inbox = () => {
  let breadcrumbs = [];
  // breadcrumbs = emailItems(false);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.inbox} />
  );
  return breadcrumbs;
};

const draft = (params) => {
  let breadcrumbs = [];
  // breadcrumbs = emailItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.draft} />
  );
  return breadcrumbs;
};

const composer = () => {
  let breadcrumbs = [];
  // breadcrumbs = emailItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title={fieldLabel.home} />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.compose} />
  );
  return breadcrumbs;
};

const inboxEmailThread = (params) => {
  let breadcrumbs = [];
  let record = sessionHelper.getRecord(params.thread_id);
  breadcrumbs = emailItems(true);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={record.name} />
  );
  return breadcrumbs;
};

export default Breadcrumbs;
