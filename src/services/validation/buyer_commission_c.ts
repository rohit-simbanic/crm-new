import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { convertNumber, isEmpty } from 'helpers/misc-helper';
import { commision_pending } from './commision_pending';
import opportunityHelper from 'helpers/opportunity-helper';

export const buyer_commission_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    const statuses = [
      oppurtunityStatusList.offer_short_sale_offer_accepted,
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.offer_accepted,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close
    ];

    let errors: string[] = [];

    if (
      statuses.includes(oppurtunity?.opportunity_status_c) &&
      (!oppurtunity?.buyer_commission_c ||
        oppurtunity?.buyer_commission_c.toString().trim().length === 0)
    ) {
      errors.push(missingField('Pending Commission %'));
    }

    return errors;
  },

  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

    const priceForCalculation = opportunityHelper.getCurrentClosingPrice(opportunity);

    const commissionPending = convertNumber(opportunity?.commision_pending);

    let pendingCommission = (commissionPending / priceForCalculation) * 100;

    let result = parseFloat(`${pendingCommission}`).toFixed(2);

    return result;

  }
};
