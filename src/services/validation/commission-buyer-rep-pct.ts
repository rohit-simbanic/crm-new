import { ObjectType } from 'types';
import { commission_negotiator_commission_pct } from './commission-negotiator-commission-pct';

export const commission_buyer_rep_pct = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (opportunity?.commission_buyer_rep == 'yes') {
      return 7.5;
    }
    return 0;
  },

  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      commission_negotiator_commission_pct:
        commission_negotiator_commission_pct.calculate(
          opportunity,
          originalOpportunity
        )
    };

    return result;
  }
};
