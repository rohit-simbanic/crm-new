import SurfingIcon from '@mui/icons-material/Surfing';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { v4 as uuid } from 'uuid';

const negotiator = {
  label: 'Negotiator',
  url: () => `/dashboard/negotiator`,
  labelIcon: SurfingIcon,
  model: 'Opportunities',
  permission: 'list',
  nodeId: uuid()
};

const transaction = {
  label: 'Transaction',
  url: (id: string) => `/dashboard/transaction`,
  labelIcon: MonetizationOnIcon,
  model: 'Opportunities',
  permission: 'list',
  nodeId: uuid()
};

const closing = {
  label: 'Closing',
  url: (id: string) => `/dashboard/closing`,
  labelIcon: ShoppingCartIcon,
  model: 'Opportunities',
  permission: 'list',
  nodeId: uuid()
};

const dashboardMenuItems = {
  list: [negotiator, closing, transaction]
};

export default dashboardMenuItems;
