import { isEmpty, isValueChanged } from 'helpers/misc-helper';
import userFullName from 'helpers/user-name-helper';
import { ObjectType } from 'types';

export const inspection_confirmation_by = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      !isEmpty(opportunity.inspection_confirmation_date) &&
      isValueChanged(
        opportunity,
        originalOpportunity,
        'inspection_confirmation_date'
      )
    ) {
      let user = JSON.parse(localStorage.getItem('user') || '');
      return {
        id: user?.user?.id,
        name: userFullName(user?.user)
      };
    }
    return opportunity.inspection_confirmation_by;
  }
};
