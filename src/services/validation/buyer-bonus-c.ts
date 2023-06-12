import { ObjectType } from 'types';
import { initial_commission_amount } from './initial_commission_amount';
import opportunityHelper from 'helpers/opportunity-helper';

export const buyer_bonus_c = {
  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

    const initialCommissionAmount = initial_commission_amount.calculate(opportunity, originalOpportunity);
    opportunity = {
      ...opportunity,
      initial_commission_amount: initialCommissionAmount
    };

    const commissions = opportunityHelper.calculateCommission(opportunity);

    const result = {
      initial_commission_amount: initialCommissionAmount,
      ...commissions
    }


    return result;
  }
};
