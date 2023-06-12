import { balance_to_close_c } from './balance_to_close_c';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';
import { initial_commission_amount } from './initial_commission_amount';
import opportunityHelper from 'helpers/opportunity-helper';

export const purchase_price_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (status === 'edit') {
      const statuseListEdit = [oppurtunityStatusList.closed_purchased];

      if (
        statuseListEdit.includes(oppurtunity?.opportunity_status_c) &&
        isEmpty(oppurtunity?.purchase_price_c)
      ) {
        errors.push(missingField('Purchase Price'));
      }
    }

    if (status === 'action') {
      if (
        (oppurtunityStatusList.closed_purchased ===
          oppurtunity?.opportunity_status_c &&
          oppurtunity?.purchase_price_c.trim().length === 0) ||
        oppurtunity?.purchase_price_c === 0.0
      ) {
        errors.push(missingField('Purchase Price'));
      }
    }

    return errors;
  },

  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

    const closeBalance = balance_to_close_c.calculate(opportunity);

    const initialCommissionAmount = initial_commission_amount.calculate(opportunity, originalOpportunity);
    opportunity = {
      ...opportunity,
      initial_commission_amount: initialCommissionAmount
    };

    const commissions = opportunityHelper.calculateCommission(opportunity);

    const result = {
      balance_to_close_c: closeBalance,
      initial_commission_amount: initialCommissionAmount,
      ...commissions
    }


    return result;
  }
};
