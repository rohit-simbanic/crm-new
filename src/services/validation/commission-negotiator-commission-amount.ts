import { convertNumber } from 'helpers/misc-helper';
import { ObjectType } from 'types';
import { commission_negotiator_commission_pct } from './commission-negotiator-commission-pct';

export const commission_negotiator_commission_amount = {
  calculate: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    const contractPrice = convertNumber(opportunity?.contract_price_c);
    const initialCommissionPercentage = convertNumber(
      opportunity?.initial_commission_percentage
    );
    const commissionNegotiatorCommissionPct =
      commission_negotiator_commission_pct.calculate(
        opportunity,
        originalOpportunity
      );

    let value =
      contractPrice *
      (initialCommissionPercentage / 100) *
      (commissionNegotiatorCommissionPct / 100);

    return value;
  }
};
