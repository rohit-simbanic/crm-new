import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CopyAllIcon from '@mui/icons-material/CopyAll';
/** @TODO add Types */

const emailTemplates = {
  label: 'List',
  url: (id: string) => `/email-templates`,
  labelIcon: ListAltIcon,
  model: 'Email_Template',
  permission: 'list',
  nodeId: uuid()
};

const createEmailTemplate = {
  label: 'Create',
  url: (id: string) => `/email-templates/create`,
  labelIcon: CreateIcon,
  model: 'Email_Template',
  permission: 'edit',
  nodeId: uuid()
};

const editEmailTemplate = {
  label: 'Edit',
  url: (id: string) => `/email-templates/${id}/edit`,
  labelIcon: EditIcon,
  model: 'Email_Template',
  permission: 'edit',
  nodeId: uuid()
};

const viewEmailTemplate = {
  label: 'View',
  url: (id: string) => `/email-templates/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'Email_Template',
  permission: 'view',
  nodeId: uuid()
};

const marketPreferenceList = {
  label: 'Market Preference',
  url: (id: string) => `/email-templates/${id}/market-preferences`,
  labelIcon: ManageAccountsIcon,
  model: 'Email_Template',
  permission: 'view',
  nodeId: uuid()
};

const duplicateEmailTemplate = {
  label: 'Duplicate',
  url: (id: string) => `/email-templates/${id}/duplicate`,
  labelIcon: CopyAllIcon,
  model: 'Email_Template',
  permission: 'view',
  nodeId: uuid()
};

const emailTemplateMenuItems = {
  list: [emailTemplates, createEmailTemplate],
  edit: [
    emailTemplates,
    viewEmailTemplate,
    duplicateEmailTemplate,
    marketPreferenceList
  ],
  create: [emailTemplates],
  view: [
    emailTemplates,
    editEmailTemplate,
    duplicateEmailTemplate,
    marketPreferenceList
  ]
};

export default emailTemplateMenuItems;
