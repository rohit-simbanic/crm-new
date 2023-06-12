import { ObjectType } from 'types';

const mlsStatus: ObjectType = {
  pending: 'Pending',
  active: 'Active',
  temporarily_off_market: 'Temporarily Off Market',
  withdrawn: 'Withdrawn',
  expired: 'Expired',
  sold: 'Sold',
  terminated: 'Terminated'
};

export default mlsStatus;
