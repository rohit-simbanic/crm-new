import DashboardIcon from '@mui/icons-material/Dashboard';
import { v4 as uuid } from 'uuid';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HouseIcon from '@mui/icons-material/House';
import StoreIcon from '@mui/icons-material/Store';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ArticleIcon from '@mui/icons-material/Article';
import DraftsIcon from '@mui/icons-material/Drafts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MailIcon from '@mui/icons-material/Mail';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SurfingIcon from '@mui/icons-material/Surfing';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import QueueIcon from '@mui/icons-material/Queue';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';

const topMenuItems = [
  {
    label: 'Dashboards',
    labelIcon: DashboardIcon,
    showInTopbar: true,
    nodeId: uuid(),
    subMenuItems: [
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
    ]
  },
  {
    label: 'Offers-Closings',
    url: '/properties',
    labelIcon: HouseIcon,
    showInTopbar: true,
    nodeId: uuid()
  },
  { label: 'Market', url: '/msa', labelIcon: StoreIcon, nodeId: uuid() },
  {
    label: 'Accounts',
    url: '/accounts',
    labelIcon: CorporateFareIcon,
    nodeId: uuid()
  },
  {
    label: 'Documents',
    url: '/documents',
    labelIcon: ArticleIcon,
    nodeId: uuid()
  },
  {
    label: 'Email Templates',
    url: '/email-templates',
    labelIcon: DraftsIcon,
    nodeId: uuid()
  },
  {
    label: 'Market Preferences',
    url: '/market-preferences',
    labelIcon: ManageAccountsIcon,
    nodeId: uuid()
  },
  {
    label: 'Market Preference Brokerage Users',
    url: '/market-preferences-brokerage-users',
    labelIcon: DirectionsRunIcon,
    nodeId: uuid()
  },
  {
    label: 'Opportunity Brokerage Users',
    url: '/opportunity-brokerage-users',
    labelIcon: Diversity3Icon,
    nodeId: uuid()
  },
  {
    label: 'Emails',
    url: '/email/inbox',
    labelIcon: MailIcon,
    nodeId: uuid()
  },
  {
    label: 'Contracts',
    url: '/pdf-templates',
    labelIcon: RequestPageIcon,
    nodeId: uuid()
  },
  { label: 'Parties', url: '/parties', labelIcon: PeopleIcon, nodeId: uuid() },
  {
    label: 'Services',
    url: '/services',
    labelIcon: MiscellaneousServicesIcon,
    nodeId: uuid()
  },
  {
    label: 'SQS',
    url: '/sqs',
    labelIcon: QueueIcon,
    nodeId: uuid()
  },
  {
    label: 'Tasks',
    url: '/tasks',
    labelIcon: AssignmentIcon,
    nodeId: uuid()
  },
  {
    label: 'Transaction History',
    url: '/transaction-histories',
    labelIcon: HistoryIcon,
    nodeId: uuid()
  },
  {
    label: 'Reports',
    url: '/reports',
    showInTopbar: true,
    labelIcon: SummarizeIcon,
    nodeId: uuid()
  }
];

export default topMenuItems;
