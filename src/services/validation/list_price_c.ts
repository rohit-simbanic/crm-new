import { ObjectType } from 'types';
import { offer_to_list_c } from './offer-to-list-c';

export const list_price_c = {
  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      offer_to_list_c: offer_to_list_c.calculate(
        opportunity,
        originalOpportunity
      )
    };

    return result;
  }
};
