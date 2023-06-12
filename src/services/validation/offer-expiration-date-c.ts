import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const offer_expiration_date_c = {
  calculate: (opportunity: ObjectType, originalOpportuntiy: ObjectType) => {
    if (
      isEmpty(opportunity.offer_expiration_date_c) &&
      !isEmpty(opportunity.close_date_c)
    ) {
      return opportunity.close_date_c;
    }
    return opportunity.offer_expiration_date_c;
  }
};
