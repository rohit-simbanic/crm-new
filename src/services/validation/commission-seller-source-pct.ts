import { ObjectType } from 'types';
import { commission_negotiator_commission_pct } from './commission-negotiator-commission-pct';

export const commission_seller_source_pct = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let values: ObjectType = {
      '': 0,
      entera_client: 0,
      entera_known: 10,
      direct_unknown: 17.5
    };

    return values[opportunity?.commission_seller_source];
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
