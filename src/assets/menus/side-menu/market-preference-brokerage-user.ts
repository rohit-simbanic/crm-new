import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { v4 as uuid } from 'uuid';
import HistoryIcon from '@mui/icons-material/History';
/** @TODO add Types */

const listBrokerageUser = {
  label: 'List',
  url: (id: string) => `/market-preferences-brokerage-users`,
  labelIcon: ListAltIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'list',
  nodeId: uuid()
};

const createBrokerageUser = {
  label: 'Create Market Preferences',
  url: (id: string) => `/market-preferences-brokerage-users/create`,
  labelIcon: CreateIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'edit',
  nodeId: uuid()
};

const viewBrokerageUser = {
  label: 'View',
  url: (id: string) => `/market-preferences-brokerage-users/${id}/view`,
  labelIcon: ListAltIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogBrokerageUser = {
  label: 'View Changelog',
  url: (id: string) =>
    `/market-preferences-brokerage-users/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'view',
  nodeId: uuid()
};

const editBrokerageUser = {
  label: 'Edit',
  url: (id: string) => `/market-preferences-brokerage-users/${id}/edit`,
  labelIcon: CreateIcon,
  model: 'Market_Preferences_Brokerage_User',
  permission: 'edit',
  nodeId: uuid()
};

const marketPreferenceBrokerageUserMenuItems = {
  list: [listBrokerageUser, createBrokerageUser],
  edit: [listBrokerageUser, viewBrokerageUser, viewChangeLogBrokerageUser],
  view: [listBrokerageUser, editBrokerageUser, viewChangeLogBrokerageUser]
};

export default marketPreferenceBrokerageUserMenuItems;
