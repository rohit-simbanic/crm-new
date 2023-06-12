import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuid } from 'uuid';
import HistoryIcon from '@mui/icons-material/History';

const partyList = {
  label: 'List',
  url: (id: string) => `/parties`,
  labelIcon: ListAltIcon,
  model: 'parties',
  permission: 'list',
  nodeId: uuid()
};

const createParty = {
  label: 'Create Party',
  url: (id: string) => `/parties/create`,
  labelIcon: CreateIcon,
  model: 'parties',
  permission: 'edit',
  nodeId: uuid()
};

const editParty = {
  label: 'Edit',
  url: (id: string) => `/parties/${id}/edit`,
  labelIcon: EditIcon,
  model: 'parties',
  permission: 'view',
  nodeId: uuid()
};

const viewParty = {
  label: 'View',
  url: (id: string) => `/parties/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'parties',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogParty = {
  label: 'View Changelog',
  url: (id: string) => `/parties/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'parties',
  permission: 'view',
  nodeId: uuid()
};

const partyMenuItems = {
  list: [partyList, createParty],
  edit: [partyList, viewParty, viewChangeLogParty],

  create: [partyList, createParty],

  view: [partyList, editParty, viewChangeLogParty]
};

export default partyMenuItems;
