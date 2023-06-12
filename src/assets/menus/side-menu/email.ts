import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const inbox = {
  label: 'Inbox',
  url: (id: string) => `/email/inbox`,
  labelIcon: ListAltIcon,
  model: 'Emails',
  permission: 'list',
  nodeId: uuid()
};

const compose = {
  label: 'Compose',
  url: (id: string) => `/email/compose`,
  labelIcon: CreateIcon,
  model: 'Emails',
  permission: 'edit',
  nodeId: uuid()
};

const draft = {
  label: 'Draft',
  url: (id: string) => `/email/draft`,
  labelIcon: ListAltIcon,
  model: 'Emails',
  permission: 'edit',
  nodeId: uuid()
};

const emailMenuItems = {
  list: [compose, inbox, draft]
};

export default emailMenuItems;
