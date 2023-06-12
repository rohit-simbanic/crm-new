import { ObjectType } from 'types';
import { initial_commission_amount } from './initial_commission_amount';
import opportunityHelper from 'helpers/opportunity-helper';
import { convertNumber } from 'helpers/misc-helper';

export const initial_commission_percentage = {
  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

    let data = { ...opportunity };

    const initialCommissionAmount = initial_commission_amount.calculate(data, originalOpportunity);
    data = {
      ...data,
      initial_commission_amount: initialCommissionAmount
    };

    const commissions = opportunityHelper.calculateCommission(data);
    const result = {
      initial_commission_amount: initialCommissionAmount,
      ...commissions
    }

    return result;
  },


  calculate: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {

    if (opportunity?.initial_commission_percentage_changed) {
      return opportunity?.initial_commission_percentage;
    }

    const initialCommissionAmount = convertNumber(opportunity?.initial_commission_amount);

    let priceForCalculation = opportunityHelper.getCurrentClosingPrice(opportunity);

    let result = (initialCommissionAmount / priceForCalculation) * 100;

    return result;
  }
};
