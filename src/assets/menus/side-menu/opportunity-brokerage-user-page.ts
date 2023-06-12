import { OpportunityBrokerageUserEntity } from 'types/opportunity-brokerage-user-types';
import ListAltIcon from '@mui/icons-material/ListAlt';

const opportunityBrokerageUserMenuItems = {
  list: () => {
    return {
      list: {
        label: 'List',
        url: `/opportunity-brokerage-users`,
        labelIcon: ListAltIcon,
        subItems: {}
      }
    };
  },
  view: (opportunityBrokerageUser: OpportunityBrokerageUserEntity) => {
    return {
      view: {
        label: 'View',
        url: `/opportunity-brokerage-users/${opportunityBrokerageUser.id}/view`,
        labelIcon: ListAltIcon,
        subItems: {}
      }
    };
  }
};

export default opportunityBrokerageUserMenuItems;
