import ListAltIcon from '@mui/icons-material/ListAlt';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const listCall = {
  label: 'List',
  url: (id: string) => `/calls`,
  labelIcon: ListAltIcon,
  model: 'Calls',
  permission: 'list',
  nodeId: uuid()
};

const callMenuItems = {
  list: [listCall]
};

export default callMenuItems;
