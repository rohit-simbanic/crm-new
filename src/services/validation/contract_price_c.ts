import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { initial_commission_amount } from './initial_commission_amount';
import { balance_to_close_c } from './balance_to_close_c';
import opportunityHelper from 'helpers/opportunity-helper';

export const contract_price_c = {
  validate: function (opppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (status === 'edit') {
      const statuseListEdit = [
        oppurtunityStatusList.offer_short_sale_offer_accepted,
        oppurtunityStatusList.closing_diligence_period
      ];

      if (
        statuseListEdit.includes(opppurtunity?.opportunity_status_c) &&
        (!opppurtunity?.contract_price_c ||
          opppurtunity?.contract_price_c.trim().length === 0)
      ) {
        errors.push(missingField('Contract Price'));
      }
    }

    if (status === 'action') {
      if (
        (oppurtunityStatusList.closing_diligence_period ===
          opppurtunity?.opportunity_status_c &&
          opppurtunity?.contract_price_c.trim().length === 0) ||
        opppurtunity?.contract_price_c === 0.0
      ) {
        errors.push(missingField('Contract Price'));
      }
    }

    return errors;
  },

  handleChange: (opportunity: any, originalOpportunity: any) => {


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

    return result
  }

};
