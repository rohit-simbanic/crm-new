import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';
import HistoryIcon from '@mui/icons-material/History';
/** @TODO add Types */

const listSQS = {
  label: 'List',
  url: (id: string) => `/sqs`,
  labelIcon: ListAltIcon,
  model: 'SQS',
  permission: 'list',
  nodeId: uuid()
};

const createSQS = {
  label: 'Create SQS',
  url: (id: string) => `/sqs/create`,
  labelIcon: CreateIcon,
  model: 'SQS',
  permission: 'edit',
  nodeId: uuid()
};

const viewSQS = {
  label: 'View',
  url: (id: string) => `/sqs/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'SQS',
  permission: 'view',
  nodeId: uuid()
};

const editSQS = {
  label: 'Edit',
  url: (id: string) => `/sqs/${id}/edit`,
  labelIcon: CreateIcon,
  model: 'SQS',
  permission: 'edit',
  nodeId: uuid()
};

const viewChangeLogSQS = {
  label: 'View Changelog',
  url: (id: string) => `/sqs/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'SQS',
  permission: 'view',
  nodeId: uuid()
};

const sqsMenuItems = {
  list: [listSQS],
  edit: [listSQS, viewSQS, viewChangeLogSQS],
  view: [listSQS, editSQS, viewChangeLogSQS]
};

export default sqsMenuItems;
