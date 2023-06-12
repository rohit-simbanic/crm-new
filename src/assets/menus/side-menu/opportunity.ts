// @ts-nocheck
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CallIcon from '@mui/icons-material/Call';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import ChatIcon from '@mui/icons-material/Chat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateIcon from '@mui/icons-material/Create';
import DraftsIcon from '@mui/icons-material/Drafts';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import InboxIcon from '@mui/icons-material/Inbox';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailIcon from '@mui/icons-material/Mail';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import NoteIcon from '@mui/icons-material/Note';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueueIcon from '@mui/icons-material/Queue';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';
import brokerageActionItems from 'assets/menus/side-menu/brokerage-action-items';
import { v4 as uuid } from 'uuid';

const opportunityView = {
  label: 'View',
  url: (id: string) => `/opportunities/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'Opportunities',
  permission: 'view',
  nodeId: uuid()
};

const opportunityEdit = {
  label: 'Edit',
  url: (id: string) => `/opportunities/${id}/edit`,
  labelIcon: EditIcon,
  model: 'Opportunities',
  permission: 'edit',
  nodeId: uuid()
};

const generateContract = {
  label: 'Generate Contract',
  url: (id: string) => `/opportunities/${id}/generate_contract`,
  labelIcon: ListAltIcon,
  model: 'Opportunities',
  permission: 'view',
  nodeId: uuid()
};

const viewChangelog = {
  label: 'View Changelog',
  url: (id: string) => `/opportunities/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'Opportunities',
  permission: 'list',
  key: uuid()
};

const opportunityMenu = {
  label: 'Opportunity',
  labelIcon: AttachMoneyIcon,
  subMenuItems: [opportunityView, opportunityEdit],
  nodeId: uuid()
};

const emailCompose = {
  label: 'Compose',
  url: (id: string) => `/opportunities/${id}/email/compose`,
  labelIcon: CreateIcon,
  model: 'Emails',
  permission: 'edit',
  nodeId: uuid()
};

const emailInbox = {
  label: 'Inbox',
  url: (id: string) => `/opportunities/${id}/email/inbox`,
  labelIcon: InboxIcon,
  model: 'Emails',
  permission: 'list',
  nodeId: uuid()
};

const emailDraft = {
  label: 'Draft',
  url: (id: string) => `/opportunities/${id}/email/draft`,
  labelIcon: DraftsIcon,
  model: 'Emails',
  permission: 'edit',
  nodeId: uuid()
};

const email = {
  label: 'Email',
  labelIcon: MailIcon,
  subMenuItems: [emailCompose, emailInbox, emailDraft],
  nodeId: uuid()
};

const documentList = {
  label: 'List',
  url: (id: string) => `/opportunities/${id}/documents/list`,
  labelIcon: ListAltIcon,
  model: 'Documents',
  permission: 'list',
  nodeId: uuid()
};

const documentUpload = {
  label: 'Upload',
  url: (id: string) => `/opportunities/${id}/documents/upload`,
  labelIcon: CloudUploadIcon,
  model: 'Documents',
  permission: 'edit',
  nodeId: uuid()
};

const document = {
  label: 'Documents',
  labelIcon: InsertDriveFileIcon,
  subMenuItems: [documentList, documentUpload],
  nodeId: uuid()
};

const serviceList = {
  label: 'List',
  url: (id: string) => `/opportunities/${id}/services/list`,
  labelIcon: ListAltIcon,
  model: 'SERVICE',
  permission: 'list',
  nodeId: uuid()
};

const serviceCreate = {
  label: 'Create',
  url: (id: string) => `/opportunities/${id}/services/create`,
  labelIcon: AddIcon,
  model: 'SERVICE',
  permission: 'create',
  nodeId: uuid()
};

const service = {
  label: 'Services',
  labelIcon: MiscellaneousServicesIcon,
  subMenuItems: [serviceList, serviceCreate],
  nodeId: uuid()
};

const partyList = {
  label: 'List',
  url: (id: string) => `/opportunities/${id}/parties/list`,
  labelIcon: ListAltIcon,
  model: 'parties',
  permission: 'list',
  nodeId: uuid()
};

const taskList = {
  label: 'Task',
  url: (id: string) => `/opportunities/${id}/tasks/list`,
  labelIcon: TaskIcon,
  model: 'Tasks',
  permission: 'list',
  key: uuid(),
  nodeId: uuid()
};

const callList = {
  label: 'Calls',
  url: (id: string) => `/opportunities/${id}/calls/list`,
  labelIcon: CallIcon,
  model: 'Calls',
  permission: 'list',
  key: uuid(),
  nodeId: uuid()
};

const partyCreate = {
  label: 'Create',
  url: (id: string) => `/opportunities/${id}/parties/create`,
  labelIcon: AddIcon,
  model: 'parties',
  permission: 'edit',
  nodeId: uuid()
};

const party = {
  label: 'Parties',
  labelIcon: PeopleAltIcon,
  subMenuItems: [partyList, partyCreate],
  nodeId: uuid()
};

const task = {
  label: 'Tasks',
  labelIcon: TaskIcon,
  subMenuItems: [taskList],
  key: uuid(),
  nodeId: uuid(),
  permission: 'list'
};

const call = {
  label: 'Calls',
  labelIcon: CallIcon,
  subMenuItems: [callList],
  key: uuid(),
  nodeId: uuid(),
  permission: 'list'
};

const negotiatorNotes = {
  label: 'Negotiator Notes',
  url: (id: string) => `/opportunities/${id}/notes_chats/negotiator_notes`,
  labelIcon: NoteAddIcon,
  model: 'Opportunities',
  permission: 'view',
  nodeId: uuid()
};

const transactionNotes = {
  label: 'Transaction Notes',
  url: (id: string) => `/opportunities/${id}/notes_chats/transaction_notes`,
  labelIcon: NoteAddIcon,
  model: 'Opportunities',
  permission: 'view',
  nodeId: uuid()
};

const brokerageNotes = {
  label: 'Brokerage Notes',
  url: (id: string) => `/opportunities/${id}/notes_chats/brokerage_notes`,
  labelIcon: NoteAddIcon,
  model: 'Opportunities',
  permission: 'view',
  nodeId: uuid()
};

const clientChats = {
  label: 'Client Chat',
  url: (id: string) => `/opportunities/${id}/notes_chats/client_chats`,
  labelIcon: ChatIcon,
  model: 'Opportunities',
  permission: 'view',
  nodeId: uuid()
};

const noteChat = {
  label: 'Notes/Chats',
  labelIcon: NoteIcon,
  subMenuItems: [
    negotiatorNotes,
    transactionNotes,
    brokerageNotes,
    clientChats
  ],
  nodeId: uuid()
};

const brokerageUserList = {
  label: 'List',
  url: (id: string) => `/opportunities/${id}/opportunity-brokerage-users/list`,
  labelIcon: ListAltIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'list',
  nodeId: uuid()
};

const brokerageUserCreate = {
  label: 'Create',
  url: (id: string) =>
    `/opportunities/${id}/opportunity-brokerage-users/create`,
  labelIcon: AddIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'edit',
  nodeId: uuid()
};

const brokerageUsers = {
  label: 'Opportunity Brokerage User',
  labelIcon: AccountCircleIcon,
  subMenuItems: [brokerageUserList, brokerageUserCreate],
  nodeId: uuid()
};

const sqsList = {
  label: 'SQS Messages',
  url: (id: string) => `/opportunities/${id}/sqs/list`,
  labelIcon: QueueIcon,
  model: 'SQS',
  permission: 'list',
  nodeId: uuid()
};

const sqs = {
  label: 'SQS Messages',
  labelIcon: QueueIcon,
  subMenuItems: [sqsList],
  nodeId: uuid()
};

const transactionList = {
  label: 'Transaction History',
  url: (id: string) => `/opportunities/${id}/transaction-histories/list`,
  labelIcon: ReceiptLongIcon,
  model: 'TRANSACTION_HISTORY',
  permission: 'list',
  nodeId: uuid()
};

const transactionHistory = {
  label: 'Transaction History',
  labelIcon: ReceiptLongIcon,
  subMenuItems: [transactionList],
  nodeId: uuid()
};

const getActions = (data: any) => {
  let actions = [];
  let statusActions =
    brokerageActionItems[data.opportunity_status_c || 'default'];

  for (const key of Object.keys(statusActions)) {
    let url = (id: string, $nodeId: string) =>
      `/opportunities/${id}/actions/${key}`;

    actions.push({
      label: statusActions[key],
      url: url(data.id, key),
      labelIcon: ListAltIcon,
      model: 'Opportunity',
      permission: 'edit',
      nodeId: uuid()
    });
  }

  return actions;
};

const brokerageActions = (opportunityModel) => {
  let actions;
  let state = opportunityModel.opportunity_status_c || 'default';

  if (brokerageActionItems[state]) {
    actions = {
      label: 'Actions',
      labelIcon: CallToActionIcon,
      subMenuItems: getActions(opportunityModel),
      nodeId: uuid()
    };
    return actions;
  }

  return {};
};

const opportunityMenuItems = {
  view: [
    opportunityMenu,
    email,
    document,
    service,
    party,
    noteChat,
    brokerageUsers,
    generateContract,
    callList,
    taskList,
    sqsList,
    transactionList,
    viewChangelog
  ],
  brokerageActions: brokerageActions
};

export default opportunityMenuItems;
