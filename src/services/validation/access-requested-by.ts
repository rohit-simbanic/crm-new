import { isEmpty, isValueChanged } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const access_requested_by = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      !isEmpty(opportunity.access_requested_date) &&
      isValueChanged(opportunity, originalOpportunity, 'access_requested_date')
    ) {
      const currentUser = JSON.parse(localStorage.getItem('user') || 'false');
      return {
        id: currentUser?.user?.id,
        name: `${currentUser?.user?.first_name} ${currentUser?.user?.last_name}`
      };
    }
    return opportunity.access_requested_by;
  }
};
