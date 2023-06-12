import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';
import HistoryIcon from '@mui/icons-material/History';
/** @TODO add Types */

const listSerice = {
  label: 'List',
  url: (id: string) => `/services`,
  labelIcon: ListAltIcon,
  model: 'SERVICE',
  permission: 'list',
  nodeId: uuid()
};

const createService = {
  label: 'Create Service',
  url: (id: string) => `/services/create`,
  labelIcon: CreateIcon,
  model: 'SERVICE',
  permission: 'edit',
  nodeId: uuid()
};

const viewService = {
  label: 'View',
  url: (id: string) => `/services/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'SERVICE',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogService = {
  label: 'View Changelog',
  url: (id: string) => `/services/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'SERVICE',
  permission: 'view',
  nodeId: uuid()
};

const editService = {
  label: 'Edit',
  url: (id: string) => `/services/${id}/edit`,
  labelIcon: CreateIcon,
  model: 'SERVICE',
  permission: 'edit',
  nodeId: uuid()
};

const serviceMenuItems = {
  list: [listSerice],
  edit: [listSerice, viewService, viewChangeLogService],
  view: [listSerice, editService, viewChangeLogService]
};

export default serviceMenuItems;
