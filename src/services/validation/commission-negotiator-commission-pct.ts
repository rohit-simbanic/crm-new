import { ObjectType } from 'types';
import { commission_buyer_rep_pct } from './commission-buyer-rep-pct';
import { commission_buyer_source_pct } from './commission-buyer-source-pct';
import { commission_negotiator_commission_amount } from './commission-negotiator-commission-amount';
import { commission_seller_rep_pct } from './commission-seller-rep-pct';
import { commission_seller_source_pct } from './commission-seller-source-pct';

export const commission_negotiator_commission_pct = {
  calculate: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    const buyer_source_pct = commission_buyer_source_pct.calculate(
      opportunity,
      originalOpportunity
    );
    const buyer_rep_pct = commission_buyer_rep_pct.calculate(
      opportunity,
      originalOpportunity
    );
    const seller_source_pct = commission_seller_source_pct.calculate(
      opportunity,
      originalOpportunity
    );
    const seller_rep_pct = commission_seller_rep_pct.calculate(
      opportunity,
      originalOpportunity
    );

    return (
      buyer_source_pct + buyer_rep_pct + seller_source_pct + seller_rep_pct
    );
  },

  handleChange: function (oppurtyunity: any, oldOppurtunity: any) {
    let result = {
      commission_negotiator_commission_amount:
        commission_negotiator_commission_amount.calculate(
          oppurtyunity,
          oldOppurtunity
        )
    };

    return result;
  }
};
