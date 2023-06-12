import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { ObjectType } from 'types';
import { final_commission } from './final_commission';
import opportunityHelper from 'helpers/opportunity-helper';
import { convertNumber } from 'helpers/misc-helper';

export const final_commission_percentage = {
  validate: function (opppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const stateList = [
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.closing_clear_to_close
    ];

    if (
      stateList.includes(opppurtunity?.opportunity_status_c) &&
      (!opppurtunity?.final_commission_percentage ||
        opppurtunity?.final_commission_percentage.trim().length === 0)
    ) {
      errors.push(missingField('Actual Commission %'));
    }

    return [];
  },
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      ![
        oppurtunityStatusList.closing_sale_pending,
        oppurtunityStatusList.closing_sale_pending_amended,
        oppurtunityStatusList.closing_clear_to_close,
        oppurtunityStatusList.closed_purchased,
        oppurtunityStatusList.closing_termination_pending
      ].includes(opportunity?.opportunity_status_c)
    ) {
      return convertNumber(opportunity?.final_commission_percentage);
    }

    let finalCommission;

    if (opportunity?.final_commission_changed) {
      finalCommission = convertNumber(opportunity?.final_commission);
    } else {
      finalCommission = final_commission.calculate(
        opportunity,
        originalOpportunity
      );
    }

    const priceForCalculation =
      opportunityHelper.getCurrentClosingPrice(opportunity);

    let finalCommissionPercentage =
      (finalCommission / priceForCalculation) * 100;

    return finalCommissionPercentage;
  }
};
