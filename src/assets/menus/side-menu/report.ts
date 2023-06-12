import ListAltIcon from '@mui/icons-material/ListAlt';

const reportList = {
  label: 'List',
  url: (id: string) => `/reports`,
  labelIcon: ListAltIcon,
  model: 'reports',
  permission: 'list',
  nodeId: 1
};

const reportMenuItems = {
  list: [reportList]
};

export default reportMenuItems;
