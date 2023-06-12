import { v4 as uuid } from 'uuid';
import SurfingIcon from '@mui/icons-material/Surfing';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const dashboardTopMenuItems = [
  {
    label: 'Negotiator',
    url: `/dashboard/negotiator`,
    labelIcon: SurfingIcon,
    nodeId: uuid()
  },
  {
    label: 'Closing',
    url: `/dashboard/closing`,
    labelIcon: ShoppingCartIcon,
    nodeId: uuid()
  },
  {
    label: 'Transaction',
    url: `/dashboard/transaction`,
    labelIcon: MonetizationOnIcon,
    nodeId: uuid()
  }
];

export default dashboardTopMenuItems;
