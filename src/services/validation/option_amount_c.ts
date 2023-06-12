import { ObjectType } from 'types';
import { balance_to_close_c } from './balance_to_close_c';
import { offer_to_list_c } from './offer-to-list-c';

export const option_amount_c = {
  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let result = {
      balance_to_close_c: balance_to_close_c.calculate(opportunity),
      offer_to_list_c: offer_to_list_c.calculate(
        opportunity,
        originalOpportunity
      )
    };

    return result;
  }
};
