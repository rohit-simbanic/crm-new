import { ObjectType } from 'types';
import { offer_to_market_value_percentage_c } from './offer-to-market-value-percentage-c';

export const sale_avm_c = {
  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      offer_to_market_value_percentage_c:
        offer_to_market_value_percentage_c.calculate(
          opportunity,
          originalOpportunity
        )
    };

    return result;
  }
};
