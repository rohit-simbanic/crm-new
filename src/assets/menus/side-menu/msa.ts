import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const msaList = {
  label: 'List',
  url: (id: string) => `/msa`,
  labelIcon: ListAltIcon,
  model: 'simba_MSA',
  permission: 'list',
  nodeId: uuid()
};

const createMSA = {
  label: 'Create MSA',
  url: (id: string) => `/msa/create`,
  labelIcon: CreateIcon,
  model: 'simba_MSA',
  permission: 'edit',
  nodeId: 'create_msa'
};

const editMSA = {
  label: 'Edit',
  url: (id: string) => `/msa/${id}/edit`,
  labelIcon: EditIcon,
  model: 'simba_MSA',
  permission: 'view',
  nodeId: uuid()
};

const viewMSA = {
  label: 'View',
  url: (id: string) => `/msa/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'simba_MSA',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogMSA = {
  label: 'View Changelog',
  url: (id: string) => `/msa/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'simba_MSA',
  permission: 'view',
  nodeId: uuid()
};

const accountList = {
  label: 'List',
  url: (id: string) => `/msa/${id}/accounts/list`,
  labelIcon: ListAltIcon,
  model: 'Accounts',
  permission: 'list',
  nodeId: uuid()
};

const account = {
  label: 'Account',
  labelIcon: AddBusinessIcon,
  subMenuItems: [accountList],
  nodeId: uuid()
};

const msaMenuItems = {
  list: [msaList, createMSA],
  edit: [msaList, , viewMSA, account, viewChangeLogMSA],
  create: [msaList, createMSA],
  view: [msaList, editMSA, account, viewChangeLogMSA]
};

export default msaMenuItems;
