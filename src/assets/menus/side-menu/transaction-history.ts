import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const listTransactionHistory = {
  label: 'List',
  url: (id: string) => `/transaction-histories`,
  labelIcon: ListAltIcon,
  model: 'TRANSACTION_HISTORY',
  permission: 'list',
  nodeId: uuid()
};

const viewTransactionHistory = {
  label: 'View',
  url: (id: string) => `/transaction-histories/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'TRANSACTION_HISTORY',
  permission: 'view',
  nodeId: uuid()
};

const transactionHistoryMenuItems = {
  list: [listTransactionHistory],
  view: [listTransactionHistory]
};

export default transactionHistoryMenuItems;
