import ListAltIcon from '@mui/icons-material/ListAlt';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const listTask = {
  label: 'List',
  url: (id: string) => `/tasks`,
  labelIcon: ListAltIcon,
  model: 'Tasks',
  permission: 'list',
  nodeId: uuid()
};

const taskMenuItems = {
  list: [listTask]
};

export default taskMenuItems;
