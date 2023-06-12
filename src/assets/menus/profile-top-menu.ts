import { v4 as uuid } from 'uuid';
import Logout from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';

const profileTopMenuItems = [
  {
    label: 'Profile',
    url: `/profile`,
    labelIcon: Person2Icon,
    nodeId: uuid()
  },
  {
    label: 'Logout',
    url: `/logout`,
    labelIcon: Logout,
    nodeId: uuid()
  }
];

export default profileTopMenuItems;
