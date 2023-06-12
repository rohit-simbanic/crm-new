import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */
const accountList = {
  label: 'List',
  url: (id: string) => `/accounts`,
  labelIcon: ListAltIcon,
  model: 'Accounts',
  permission: 'list',
  nodeId: uuid()
};

const createAccount = {
  label: 'Create Account',
  url: (id: string) => `/accounts/create`,
  labelIcon: CreateIcon,
  model: 'Accounts',
  permission: 'edit',
  nodeId: uuid()
};

const editAccount = {
  label: 'Edit',
  url: (id: string) => `/accounts/${id}/edit`,
  labelIcon: EditIcon,
  model: 'Accounts',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogAccount = {
  label: 'View Changelog',
  url: (id: string) => `/accounts/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'Accounts',
  permission: 'view',
  nodeId: uuid()
};

const msaSelect = {
  label: 'Select MSA',
  url: (id: string) => `/accounts/${id}/msa/selection-list`,
  labelIcon: AddTaskIcon,
  model: 'simba_MSA',
  permission: 'list',
  nodeId: uuid()
};

const msaList = {
  label: 'List',
  url: (id: string) => `/accounts/${id}/msa/list`,
  labelIcon: ListAltIcon,
  model: 'simba_MSA',
  permission: 'list',
  nodeId: uuid()
};

const msa = {
  label: 'MSA',
  labelIcon: AddBusinessIcon,
  subMenuItems: [msaSelect, msaList],
  nodeId: uuid()
};

const viewAccount = {
  label: 'View',
  url: (id: string) => `/accounts/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'Accounts',
  permission: 'view',
  nodeId: uuid()
};

const accountMenuItems: ObjectType = {
  list: [accountList, createAccount],
  edit: [accountList, viewAccount, msa, viewChangeLogAccount],
  create: [accountList],
  view: [accountList, editAccount, msa, viewChangeLogAccount]
};

export default accountMenuItems;
