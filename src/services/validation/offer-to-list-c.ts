import { ObjectType } from 'types';
import { isEmpty, isValueChanged } from 'helpers/misc-helper';

export const offer_to_list_c = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      !isEmpty(opportunity.list_price_c) &&
      !isEmpty(opportunity.offer_price_c)
    ) {
      if (
        parseFloat(opportunity.list_price_c) > 0 &&
        parseFloat(opportunity.offer_price_c) > 0
      ) {
        if (
          isValueChanged(opportunity, originalOpportunity, 'offer_price_c') ||
          isValueChanged(opportunity, originalOpportunity, 'list_price_c')
        ) {
          const value =
            (opportunity.offer_price_c / opportunity.list_price_c) * 100;
          return value;
        }
      }
    }

    return 0;
  }
};
