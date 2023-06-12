import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CreateIcon from '@mui/icons-material/Create';
import HistoryIcon from '@mui/icons-material/History';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const listMarketPreferences = {
  label: 'List',
  url: (id: string) => `/market-preferences`,
  labelIcon: ListAltIcon,
  model: 'simba_Property',
  permission: 'list',
  nodeId: uuid()
};

const createMarketPreferences = {
  label: 'Create Market Preferences',
  url: (id: string) => `/market-preferences/create`,
  labelIcon: CreateIcon,
  model: 'simba_Property',
  permission: 'edit',
  nodeId: uuid()
};

const viewMarketPreferences = {
  label: 'View',
  url: (id: string) => `/market-preferences/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'simba_Property',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogMarketPreferences = {
  label: 'View Changelog',
  url: (id: string) => `/market-preferences/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'simba_Property',
  permission: 'view',
  nodeId: uuid()
};

const editMarketPreferences = {
  label: 'Edit',
  url: (id: string) => `/market-preferences/${id}/edit`,
  labelIcon: CreateIcon,
  model: 'simba_Property',
  permission: 'view',
  nodeId: uuid()
};

const brokerageUserCreate = {
  label: 'Create',
  url: (id: string) =>
    `/market-preferences/${id}/market-preferences-brokerage-users/create`,
  labelIcon: CreateIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'edit',
  nodeId: uuid()
};

const brokerageUserList = {
  label: 'List',
  url: (id: string) =>
    `/market-preferences/${id}/market-preferences-brokerage-users`,
  labelIcon: ListAltIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'list',
  nodeId: uuid()
};

const brokerageUser = {
  label: 'Market Preferences Brokerage User',
  labelIcon: PersonIcon,
  nodeId: uuid(),
  subMenuItems: [brokerageUserCreate, brokerageUserList]
};

const contractSelect = {
  label: 'Select Contracts',
  url: (id: string) => `/market-preferences/${id}/contracts/selection-list`,
  labelIcon: AddTaskIcon,
  model: 'AOS_PDF_Templates',
  permission: 'list',
  nodeId: uuid()
};

const contractList = {
  label: 'Contracts',
  url: (id: string) => `/market-preferences/${id}/contracts`,
  labelIcon: ListAltIcon,
  model: 'AOS_PDF_Templates',
  permission: 'list',
  nodeId: uuid()
};

const contract = {
  label: 'Contracts',
  labelIcon: PictureAsPdfIcon,
  subMenuItems: [contractSelect, contractList],
  nodeId: uuid()
};

const emailTemplateSelect = {
  label: 'Select Email Templates',
  url: (id: string) =>
    `/market-preferences/${id}/email-templates/selection-list`,
  labelIcon: AddTaskIcon,
  model: 'Email_Template',
  permission: 'list',
  nodeId: uuid()
};

const emailTemplateList = {
  label: 'Email Templates',
  url: (id: string) => `/market-preferences/${id}/email-templates`,
  labelIcon: ListAltIcon,
  model: 'Email_Template',
  permission: 'list',
  nodeId: uuid()
};

const emailTemplate = {
  label: 'Email Template',
  labelIcon: AttachEmailIcon,
  subMenuItems: [emailTemplateSelect, emailTemplateList],
  nodeId: uuid()
};

const documentCreate = {
  label: 'Create Document',
  url: (id: string) => `/market-preferences/${id}/documents/create`,
  labelIcon: AddIcon,
  model: 'Documents',
  permission: 'edit',
  nodeId: uuid()
};

const documentList = {
  label: 'Documents',
  url: (id: string) => `/market-preferences/${id}/documents`,
  labelIcon: ListAltIcon,
  model: 'Documents',
  permission: 'list',
  nodeId: uuid()
};

const document = {
  label: 'Document',
  labelIcon: InsertDriveFileIcon,
  subMenuItems: [documentCreate, documentList],
  nodeId: uuid()
};

const marketPreferenceMenuItems = {
  list: [listMarketPreferences, createMarketPreferences],
  edit: [
    listMarketPreferences,
    viewMarketPreferences,
    editMarketPreferences,
    brokerageUser,
    contract,
    document,
    emailTemplate,
    viewChangeLogMarketPreferences
  ],
  create: [listMarketPreferences, createMarketPreferences],
  view: [
    listMarketPreferences,
    viewMarketPreferences,
    editMarketPreferences,
    brokerageUser,
    contract,
    document,
    emailTemplate,
    viewChangeLogMarketPreferences
  ]
};

export default marketPreferenceMenuItems;
