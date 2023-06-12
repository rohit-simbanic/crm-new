import { ObjectType } from 'types';
import { isEmpty, isValueChanged } from 'helpers/misc-helper';

export const offer_to_market_value_percentage_c = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      !isEmpty(opportunity.sale_avm_c) &&
      !isEmpty(opportunity.offer_price_c)
    ) {
      if (
        parseFloat(opportunity.sale_avm_c) > 0 &&
        parseFloat(opportunity.offer_price_c) > 0
      ) {
        if (
          isValueChanged(opportunity, originalOpportunity, 'offer_price_c') ||
          isValueChanged(opportunity, originalOpportunity, 'sale_avm_c')
        ) {
          const value =
            (opportunity.offer_price_c / opportunity.sale_avm_c) * 100;
          return value;
        }
        return 0;
      }
    }
  }
};
