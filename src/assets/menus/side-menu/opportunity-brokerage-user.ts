import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';
import HistoryIcon from '@mui/icons-material/History';

/** @TODO add Types */

const listOpportunityBrokerageUser = {
  label: 'List',
  url: (id: string) => `/opportunity-brokerage-users`,
  labelIcon: ListAltIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'list',
  nodeId: uuid()
};

const createOpportunityBrokerageUser = {
  label: 'Create Opportunity Brokerage User',
  url: (id: string) => `/opportunity-brokerage-users/create`,
  labelIcon: CreateIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'edit',
  nodeId: uuid()
};

const viewOpportunityBrokerageUser = {
  label: 'View',
  url: (id: string) => `/opportunity-brokerage-users/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'view',
  nodeId: uuid()
};

const viewChangeLogOpportunityBrokerageUser = {
  label: 'View Changelog',
  url: (id: string) => `/opportunity-brokerage-users/${id}/view_changelog`,
  labelIcon: HistoryIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'view',
  nodeId: uuid()
};

const editOpportunityBrokerageUser = {
  label: 'Edit',
  url: (id: string) => `/opportunity-brokerage-users/${id}/edit`,
  labelIcon: CreateIcon,
  model: 'OPPORTUNITY_BROKERAGE_USER',
  permission: 'edit',
  nodeId: uuid()
};

const opportunityBrokerageUserMenuItems = {
  list: [listOpportunityBrokerageUser],
  edit: [
    listOpportunityBrokerageUser,
    viewOpportunityBrokerageUser,
    viewChangeLogOpportunityBrokerageUser
  ],
  view: [
    listOpportunityBrokerageUser,
    editOpportunityBrokerageUser,
    viewChangeLogOpportunityBrokerageUser
  ]
};

export default opportunityBrokerageUserMenuItems;
