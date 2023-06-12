import { isEmpty, isValueChanged } from 'helpers/misc-helper';
import userFullName from 'helpers/user-name-helper';
import { ObjectType } from 'types';

export const congrats_letter_sent_by = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      !isEmpty(opportunity.congrats_letter_sent_date) &&
      isValueChanged(
        opportunity,
        originalOpportunity,
        'congrats_letter_sent_date'
      )
    ) {
      let user = JSON.parse(localStorage.getItem('user') || '');
      return {
        id: user?.user?.id,
        name: userFullName(user?.user)
      };
    }
    return opportunity.congrats_letter_sent_by;
  }
};
